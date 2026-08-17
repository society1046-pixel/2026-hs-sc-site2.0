import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc
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
    
    const studentInfoField = document.getElementById('studentInfoField');
    const departmentField = document.getElementById('departmentField');
    const authOptionsField = document.getElementById('authOptionsField');
    const authCodeField = document.getElementById('authCodeField');
    
    const signupGrade = document.getElementById('signupGrade');
    const signupClass = document.getElementById('signupClass');
    const signupNumber = document.getElementById('signupNumber');
    const signupDept = document.getElementById('signupDept');
    const authCode = document.getElementById('authCode');
    const authMethodElement = document.querySelector('input[name="authMethod"]:checked');
    const authMethod = authMethodElement ? authMethodElement.value : 'code';

    if(studentInfoField) studentInfoField.style.display = 'flex';
    if(signupGrade) signupGrade.setAttribute('required', 'required');
    if(signupClass) signupClass.setAttribute('required', 'required');
    if(signupNumber) signupNumber.setAttribute('required', 'required');

    if(departmentField) departmentField.style.display = 'none';
    if(authOptionsField) authOptionsField.style.display = 'none';
    if(authCodeField) authCodeField.style.display = 'none';
    if(signupDept) signupDept.removeAttribute('required');
    if(authCode) authCode.removeAttribute('required');

    let isPendingRole = true;

    if (role === 'student') {
        isPendingRole = false;
    } else if (role === 'student_council' || role === 'class_president' || role === 'vice_president') {
        if (role === 'student_council') {
            if(departmentField) departmentField.style.display = 'flex';
            if(signupDept) signupDept.setAttribute('required', 'required');
        }
        
        if(authOptionsField) authOptionsField.style.display = 'flex';
        
        if (authMethod === 'code') {
            if(authCodeField) authCodeField.style.display = 'flex';
            if(authCode) authCode.setAttribute('required', 'required');
            isPendingRole = false;
        }
        
    } else if (role === 'teacher') {
        if(studentInfoField) studentInfoField.style.display = 'none';
        if(signupGrade) signupGrade.removeAttribute('required');
        if(signupClass) signupClass.removeAttribute('required');
        if(signupNumber) signupNumber.removeAttribute('required');

        if(authOptionsField) authOptionsField.style.display = 'flex';
        if (authMethod === 'code') {
            if(authCodeField) authCodeField.style.display = 'flex';
            if(authCode) authCode.setAttribute('required', 'required');
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

// 이벤트 및 비밀번호 실시간 체크 등록
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('.auto-hyphen');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            let val = e.target.value.replace(/[^0-9]/g, '');
            if (val.length > 3 && val.length <= 7) {
                e.target.value = val.substr(0, 3) + '-' + val.substr(3);
            } else if (val.length > 7) {
                e.target.value = val.substr(0, 3) + '-' + val.substr(3, 4) + '-' + val.substr(7);
            } else {
                e.target.value = val;
            }
        });
    });

    const signupPw = document.getElementById('signupPw');
    const signupPwConfirm = document.getElementById('signupPwConfirm');
    const pwMatchMsg = document.getElementById('pwMatchMsg');

    function checkPwMatch() {
        if(!signupPwConfirm || !signupPwConfirm.value) {
            if(pwMatchMsg) pwMatchMsg.style.display = 'none';
            return;
        }
        if(pwMatchMsg) {
            pwMatchMsg.style.display = 'block';
            if(signupPw.value === signupPwConfirm.value) {
                pwMatchMsg.textContent = '비밀번호가 일치합니다.';
                pwMatchMsg.style.color = '#28a745';
            } else {
                pwMatchMsg.textContent = '비밀번호가 일치하지 않습니다.';
                pwMatchMsg.style.color = '#dc3545';
            }
        }
    }

    if(signupPw && signupPwConfirm) {
        signupPw.addEventListener('input', checkPwMatch);
        signupPwConfirm.addEventListener('input', checkPwMatch);
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

    if (submitBtn) {
        submitBtn.innerText = "로그인 중입니다...";
        submitBtn.disabled = true;
    }

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
            department: userData.department || '',
            studentNumber: userData.studentNumber || '',
            studentId: userData.studentNumber || ''
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
    const signupPwConfirm = document.getElementById('signupPwConfirm')?.value;
    const signupName = document.getElementById('signupName')?.value.trim();
    const role = document.getElementById('signupRole')?.value;
    const dept = document.getElementById('signupDept') ? document.getElementById('signupDept').value : '';
    const phone = document.getElementById('signupPhone')?.value;

    if (signupPw !== signupPwConfirm) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
    }

    let studentNumber = "";
    if (role !== 'teacher') {
        const grade = document.getElementById('signupGrade')?.value || '';
        const stuClass = (document.getElementById('signupClass')?.value || '').padStart(2, '0');
        const stuNum = (document.getElementById('signupNumber')?.value || '').padStart(2, '0');
        studentNumber = `${grade}${stuClass}${stuNum}`;
    }

    const authMethodElement = document.querySelector('input[name="authMethod"]:checked');
    const authMethod = authMethodElement ? authMethodElement.value : 'code';

    // 인증 코드 비교 (하이픈 및 공백 유연하게 비교)
    if (authMethod === 'code') {
        const rawCode = document.getElementById('authCode')?.value || '';
        const code = rawCode.replace(/[\s-]/g, ''); // 띄어쓰기 및 - 제거한 순수 숫자/문자만 추출

        if (role === 'teacher' && code !== '260202') {
            alert("선생님 인증 코드가 올바르지 않습니다.");
            return;
        } else if (role === 'student_council' && code !== '261958') {
            alert("학생회 인증 코드가 올바르지 않습니다.");
            return;
        } else if ((role === 'class_president' || role === 'vice_president') && code !== '265039') {
            alert("반장/부반장 인증 코드가 올바르지 않습니다.");
            return;
        }
    }

    let accountStatus = "pending";
    if (role === 'student' || authMethod === 'code') {
        accountStatus = "approved";
    }

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

// 5. 모달 제어
function openModal(modalId) {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById(modalId).style.display = 'none';
    
    if (modalId === 'modalFindId') {
        document.getElementById('formFindId').reset();
        document.getElementById('findIdResult').innerHTML = '';
        document.getElementById('findIdResult').style.display = 'none';
    } else if (modalId === 'modalResetPw') {
        const verifyForm = document.getElementById('verifyPwSection');
        const updateForm = document.getElementById('updatePwSection');
        
        if (verifyForm) verifyForm.reset();
        if (updateForm) updateForm.reset();
        
        if (verifyForm) verifyForm.style.display = 'block';
        if (updateForm) updateForm.style.display = 'none';
        window.tempResetId = null;
    }
}

// 6. 아이디 찾기
async function handleFindId(event) {
    event.preventDefault();
    const name = document.getElementById('findIdName').value.trim();
    const phone = document.getElementById('findIdPhone').value.trim();
    const resultBox = document.getElementById('findIdResult');
    
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", "==", name), where("phone", "==", phone));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultBox.style.display = 'block';
            resultBox.innerHTML = '<span style="color:#E74C3C;">일치하는 회원 정보가 없습니다.</span>';
        } else {
            let foundIds = [];
            querySnapshot.forEach((docSnap) => {
                foundIds.push(docSnap.id);
            });
            resultBox.style.display = 'block';
            resultBox.innerHTML = `회원님의 아이디는 <strong>${foundIds.join(', ')}</strong> 입니다.`;
        }
    } catch (error) {
        console.error("아이디 찾기 오류:", error);
        alert("아이디를 찾는 중 오류가 발생했습니다.");
    }
}

// 7. 비밀번호 재설정 - 1단계
async function handleVerifyForPwReset(event) {
    event.preventDefault();
    const id = document.getElementById('resetPwId').value.trim();
    const name = document.getElementById('resetPwName').value.trim();
    const phone = document.getElementById('resetPwPhone').value.trim();

    try {
        const userDocRef = doc(db, "users", id);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
            const data = userSnap.data();
            if (data.name === name && data.phone === phone) {
                window.tempResetId = id;
                document.getElementById('verifyPwSection').style.display = 'none';
                document.getElementById('updatePwSection').style.display = 'block';
            } else {
                alert("입력하신 이름이나 전화번호가 회원 정보와 일치하지 않습니다.");
            }
        } else {
            alert("존재하지 않는 아이디입니다.");
        }
    } catch (error) {
        console.error("정보 확인 오류:", error);
        alert("정보를 확인하는 중 오류가 발생했습니다.");
    }
}

// 8. 비밀번호 재설정 - 2단계
async function handleUpdatePw(event) {
    event.preventDefault();
    const newPw = document.getElementById('newPw').value;
    const newPwConfirm = document.getElementById('newPwConfirm').value;

    if (newPw !== newPwConfirm) {
        alert("입력하신 두 비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
        const userDocRef = doc(db, "users", window.tempResetId);
        await updateDoc(userDocRef, { password: newPw });
        alert("비밀번호가 성공적으로 변경되었습니다! 새 비밀번호로 로그인해 주세요.");
        closeModal('modalResetPw');
    } catch (error) {
        console.error("비밀번호 변경 오류:", error);
        alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
}

// Window 전역 연결
window.switchTab = switchTab;
window.toggleRoleFields = toggleRoleFields;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.openModal = openModal;
window.closeModal = closeModal;
window.handleFindId = handleFindId;
window.handleVerifyForPwReset = handleVerifyForPwReset;
window.handleUpdatePw = handleUpdatePw;
