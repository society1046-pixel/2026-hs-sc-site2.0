import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCWPYuQeihfDgp5tVlrObBVRs2UZDlTkks",
    authDomain: "hyeongsok-student-counci-e6115.firebaseapp.com",
    projectId: "hyeongsok-student-counci-e6115",
    storageBucket: "hyeongsok-student-counci-e6115.firebasestorage.app",
    messagingSenderId: "847440892138",
    appId: "1:847440892138:web:152021aaaf5f330b2d0793",
    measurementId: "G-F40YFFMGWE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. 탭 전환
function switchTab(type) {
    document.getElementById('tabLogin').classList.toggle('active', type === 'login');
    document.getElementById('tabSignup').classList.toggle('active', type === 'signup');
    document.getElementById('loginForm').classList.toggle('active', type === 'login');
    document.getElementById('signupForm').classList.toggle('active', type === 'signup');
}

// 2. 역할별 폼 토글
function toggleRoleFields() {
    const roleSelect = document.getElementById('signupRole');
    if (!roleSelect) return;
    
    const role = roleSelect.value;
    const btn = document.getElementById('signupSubmitBtn');
    
    const departmentField = document.getElementById('departmentField');
    const teacherOptionsField = document.getElementById('teacherOptionsField');
    const teacherCodeField = document.getElementById('teacherCodeField');
    
    const signupDept = document.getElementById('signupDept');
    const teacherCode = document.getElementById('teacherCode');
    const teacherMethodElement = document.querySelector('input[name="teacherMethod"]:checked');
    const teacherMethod = teacherMethodElement ? teacherMethodElement.value : 'code';

    if(departmentField) departmentField.style.display = 'none';
    if(teacherOptionsField) teacherOptionsField.style.display = 'none';
    if(teacherCodeField) teacherCodeField.style.display = 'none';
    if(signupDept) signupDept.removeAttribute('required');
    if(teacherCode) teacherCode.removeAttribute('required');

    let isPendingRole = true;

    if (role === 'student') {
        isPendingRole = false;
    } else if (role === 'student_council') {
        if(departmentField) departmentField.style.display = 'flex';
        if(signupDept) signupDept.setAttribute('required', 'required');
    } else if (role === 'teacher') {
        if(teacherOptionsField) teacherOptionsField.style.display = 'flex';
        if (teacherMethod === 'code') {
            if(teacherCodeField) teacherCodeField.style.display = 'flex';
            if(teacherCode) teacherCode.setAttribute('required', 'required');
            isPendingRole = false;
        }
    }
    
    if (btn) {
        if (role === '') {
            btn.innerText = "회원가입 완료";
        } else if (isPendingRole) {
            btn.innerText = "회원가입 요청하기";
        } else {
            btn.innerText = "회원가입 완료";
        }
    }
}

// 전화번호 자동 하이픈
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('signupPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let val = e.target.value.replace(/[^0-9]/g, '');
            if (val.length > 3 && val.length <= 7) {
                e.target.value = val.substr(0, 3) + '-' + val.substr(3);
            } else if (val.length > 7) {
                e.target.value = val.substr(0, 3) + '-' + val.substr(3, 4) + '-' + val.substr(7);
            } else {
                e.target.value = val;
            }
        });
    }
});

// 3. 로그인 핸들러
async function handleLogin(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerText : "로그인";

    const idInput = document.getElementById('loginId')?.value.trim();
    const pwInput = document.getElementById('loginPw')?.value;

    if (!idInput || !pwInput) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
    }

    // 버튼 상태 변경 ("로그인 중입니다...")
    if (submitBtn) {
        submitBtn.innerText = "로그인 중입니다...";
        submitBtn.disabled = true;
    }

    // 실패 시 버튼 원상복구 함수
    const resetBtn = () => {
        if (submitBtn) {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    };

    try {
        const userDocRef = doc(db, "users", idInput);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
            alert("존재하지 않는 아이디입니다.");
            resetBtn();
            return;
        }

        const userData = userSnap.data();

        if (userData.password !== pwInput) {
            alert("비밀번호가 일치하지 않습니다.");
            resetBtn();
            return;
        }

        if (userData.status === 'pending') {
            alert("관리자 승인 대기 중인 계정입니다. 승인 후 로그인할 수 있습니다.");
            resetBtn();
            return;
        }

        const sessionUser = {
            id: userData.id,
            name: userData.name || userData.id,
            role: userData.role || 'student',
            department: userData.department || ''
        };

        localStorage.setItem('userSession', JSON.stringify(sessionUser));
        alert(`${sessionUser.name}님 환영합니다!`);
        window.location.href = "index.html";

    } catch (error) {
        console.error("로그인 오류:", error);
        alert("로그인 중 오류가 발생했습니다.");
        resetBtn();
    }
}

// 4. 회원가입 핸들러
async function handleSignup(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('signupSubmitBtn');
    const originalText = submitBtn ? submitBtn.innerText : "회원가입 완료";

    const signupId = document.getElementById('signupId')?.value.trim();
    const signupPw = document.getElementById('signupPw')?.value;
    const signupName = document.getElementById('signupName')?.value.trim();
    const role = document.getElementById('signupRole')?.value;
    const dept = document.getElementById('signupDept') ? document.getElementById('signupDept').value : '';
    const phone = document.getElementById('signupPhone')?.value;
    
    const grade = document.getElementById('signupGrade')?.value || '';
    const stuClass = (document.getElementById('signupClass')?.value || '').padStart(2, '0');
    const stuNum = (document.getElementById('signupNumber')?.value || '').padStart(2, '0');
    const studentNumber = `${grade}${stuClass}${stuNum}`;

    const teacherMethodElement = document.querySelector('input[name="teacherMethod"]:checked');
    const teacherMethod = teacherMethodElement ? teacherMethodElement.value : 'code';

    if (role === 'teacher' && teacherMethod === 'code') {
        const code = document.getElementById('teacherCode')?.value;
        if (code !== '0000') {
            alert("선생님 인증 코드가 올바르지 않습니다.");
            return;
        }
    }

    let accountStatus = "pending";
    if (role === 'student' || (role === 'teacher' && teacherMethod === 'code')) {
        accountStatus = "approved";
    }

    // 버튼 상태 변경 ("처리 중입니다...")
    if (submitBtn) {
        submitBtn.innerText = "처리 중입니다...";
        submitBtn.disabled = true;
    }

    const resetBtn = () => {
        if (submitBtn) {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    };

    try {
        const userDocRef = doc(db, "users", signupId);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
            alert("이미 존재하는 아이디입니다.");
            resetBtn();
            return;
        }

        await setDoc(userDocRef, {
            id: signupId,
            password: signupPw,
            name: signupName,
            studentNumber: studentNumber,
            role: role,
            department: dept,
            phone: phone,
            status: accountStatus,
            createdAt: new Date().toISOString()
        });

        if (accountStatus === "pending") {
            alert("가입 요청이 접수되었습니다. 관리자 승인 후 로그인 가능합니다.");
        } else {
            alert("회원가입이 완료되었습니다! 로그인해 주세요.");
        }

        document.getElementById('signupForm').reset();
        resetBtn();
        switchTab('login');

    } catch (error) {
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
        resetBtn();
    }
}

// 전역(window) 객체 연결
window.switchTab = switchTab;
window.toggleRoleFields = toggleRoleFields;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
