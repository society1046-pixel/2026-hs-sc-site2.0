const headerHTML = `
<style>
    /* 공통 헤더 및 네비게이션 바 스타일 */
    header {
        position: sticky;
        top: 0;
        width: 100%;
        background-color: #FFFFFF;
        border-bottom: 1px solid #F5F5F5;
        z-index: 1000;
    }
    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .nav-left {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
    }
    .nav-left img {
        height: 40px;
        width: auto;
        object-fit: contain;
    }
    .nav-left .logo-title {
        font-size: 18px;
        font-weight: 700;
        color: #111111;
        letter-spacing: -0.5px;
    }
    
    /* 중앙 메인 메뉴 (PC) - 드롭다운 포함 */
    .nav-center {
        display: flex;
        gap: 40px;
        height: 100%;
    }
    .nav-item {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
    }
    .nav-item > a {
        font-size: 15px;
        font-weight: 500;
        color: #666666;
        transition: color 0.2s ease;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .nav-item > a i {
        font-size: 12px;
        transition: transform 0.2s ease;
    }
    .nav-item:hover > a {
        color: #7BA4DB;
    }
    .nav-item:hover > a i {
        transform: rotate(180deg);
    }
    
    /* PC 드롭다운 콘텐츠 */
    .dropdown-content {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #FFFFFF;
        min-width: 150px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        border-radius: 8px;
        border: 1px solid #EEEEEE;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        z-index: 1001;
    }
    .nav-item:hover .dropdown-content {
        opacity: 1;
        visibility: visible;
        top: 75px;
    }
    .dropdown-content a {
        color: #555555;
        padding: 10px 20px;
        font-size: 14px;
        text-decoration: none;
        font-weight: 400;
        text-align: center;
        transition: background-color 0.2s, color 0.2s;
    }
    .dropdown-content a:hover {
        background-color: #F8FAFC;
        color: #7BA4DB;
        font-weight: 500;
    }
    
    /* 우측 로그인 영역 */
    .nav-right {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    /* 로그인 버튼 스타일 */
    .auth-btn {
        background-color: transparent;
        border: 1px solid #7BA4DB;
        color: #7BA4DB;
        padding: 8px 22px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .auth-btn:hover {
        background-color: #7BA4DB;
        color: #FFFFFF;
    }
    
    /* 로그인 완료 상태 (유저 정보) 스타일 */
    .user-info {
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    /* 개인정보 수정 링크 호버 효과 */
    .profile-link {
        color: #333;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .profile-link:hover {
        color: #7BA4DB;
        text-decoration: underline;
    }
    .profile-link b {
        color: #7BA4DB;
    }
    
    .logout-btn {
        background: #F1F5F9;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        color: #475569;
        cursor: pointer;
        transition: 0.2s;
    }
    .logout-btn:hover {
        background: #E2E8F0;
    }

    /* 모바일 햄버거 메뉴 버튼 */
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333333;
    }

    /* 모바일 전용 사이드바 생략(기존 동일) */
    .sidebar {
        position: fixed; top: 0; right: -280px; width: 280px; height: 100%;
        background-color: #FFFFFF; box-shadow: -5px 0 25px rgba(0,0,0,0.03);
        z-index: 2000; transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 40px 30px; display: flex; flex-direction: column; gap: 30px; overflow-y: auto;
    }
    .sidebar.active { right: 0; }
    .sidebar-close { align-self: flex-end; background: none; border: none; font-size: 24px; cursor: pointer; color: #666666; }
    
    .sidebar-menu { display: flex; flex-direction: column; gap: 10px; }
    .mobile-nav-item { display: flex; flex-direction: column; }
    .mobile-nav-link { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 500; color: #333333; padding: 12px 0; border-bottom: 1px solid #F0F0F0; text-decoration: none; cursor: pointer; }
    .mobile-nav-link i { font-size: 12px; color: #999; transition: transform 0.3s ease; }
    .mobile-dropdown-content { display: none; flex-direction: column; background-color: #F8FAFC; border-radius: 6px; padding: 10px 15px; margin-top: 5px; gap: 10px; }
    .mobile-dropdown-content a { font-size: 14px; color: #555555; text-decoration: none; padding: 5px 0; }
    .mobile-dropdown-content a:hover { color: #7BA4DB; font-weight: 500; }
    .mobile-nav-item.open .mobile-dropdown-content { display: flex; }
    .mobile-nav-item.open .mobile-nav-link i { transform: rotate(180deg); }

    .sidebar-auth { margin-top: auto; padding-top: 20px; border-top: 1px solid #F0F0F0; }
    .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.15); z-index: 1999; display: none; }
    .sidebar-overlay.active { display: block; }

    /* 모바일 최적화 */
    @media (max-width: 768px) {
        .nav-container { height: 70px; }
        .nav-center { display: none; }
        .auth-container-desktop { display: none; }
        .menu-toggle { display: block; }
    }
</style>

<header>
    <div class="nav-container">
        <a href="index.html" class="nav-left">
            <img src="https://drive.google.com/thumbnail?id=1-vFaLyktqvl_ywa0BpiBppSI6lEgsKDd&sz=w200" alt="로고">
            <span class="logo-title">형석고 학생회</span>
        </a>

        <nav class="nav-center">
            <div class="nav-item">
                <a href="#">알림 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="notice.html">공지사항</a>
                    <a href="#">건의함</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">학년부 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="#">1학년부</a>
                    <a href="#">2학년부</a>
                    <a href="#">3학년부</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">부서 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="#">회장단</a>
                    <a href="#">콘텐츠소통부</a>
                    <a href="#">문화소통부</a>
                    <a href="#">건강활동부</a>
                    <a href="#">학술문예부</a>
                    <a href="#">생활안전부</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">기타 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="https://school.cbe.go.kr/hshs-h" target="_blank">학교 홈페이지</a>
                    <a href="#">급식표 / 시간표</a>
                </div>
            </div>
        </nav>

        <div class="nav-right">
            <div class="auth-container-desktop" id="authContainerDesktop">
                <button class="auth-btn" onclick="location.href='login.html'">로그인</button>
            </div>
            
            <button class="menu-toggle" id="menuToggleBtn">
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>
    </div>
</header>

<div class="sidebar-overlay" id="sidebarOverlay"></div>
<aside class="sidebar" id="sidebarMenu">
    <button class="sidebar-close" id="sidebarCloseBtn"><i class="fa-solid fa-xmark"></i></button>
    
    <nav class="sidebar-menu">
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">알림 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="notice.html" onclick="closeSidebar()">공지사항</a>
                <a href="#" onclick="closeSidebar()">건의함</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">학년부 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="#" onclick="closeSidebar()">1학년부</a>
                <a href="#" onclick="closeSidebar()">2학년부</a>
                <a href="#" onclick="closeSidebar()">3학년부</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">부서 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="#" onclick="closeSidebar()">회장단</a>
                <a href="#" onclick="closeSidebar()">콘텐츠소통부</a>
                <a href="#" onclick="closeSidebar()">문화소통부</a>
                <a href="#" onclick="closeSidebar()">건강활동부</a>
                <a href="#" onclick="closeSidebar()">학술문예부</a>
                <a href="#" onclick="closeSidebar()">생활안전부</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">기타 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="https://school.cbe.go.kr/hshs-h" target="_blank" onclick="closeSidebar()">학교 홈페이지</a>
                <a href="#" onclick="closeSidebar()">급식표 / 시간표</a>
            </div>
        </div>
    </nav>
    
    <div class="sidebar-auth" id="authContainerMobile">
        <button class="auth-btn" style="width: 100%;" onclick="location.href='login.html'">로그인</button>
    </div>
</aside>
`;

document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    checkLoginState();
});

// 로그인 상태 및 직책 매핑 고도화
function checkLoginState() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    
    // 세분화된 직책 및 부서 매핑 (누락된 직책 추가 및 한글 저장 대비)
    const roleMapping = {
        'student': '일반학생',
        '학생': '일반학생',
        'student_council': '학생회 임원',
        'class_president': '반장',
        'vice_president': '부반장',
        'president': '전교회장',
        'dept_head': '부장', 
        'dept_vice': '차장',
        'teacher': '선생님',
        'admin': '시스템 관리자'
    };

    const deptMapping = {
        'none': '',
        '': '',
        'executives': '회장단',
        'content_comm': '콘텐츠소통부',
        'culture_comm': '문화소통부',
        'health_act': '건강활동부',
        'academic_art': '학술문예부',
        'safety_life': '생활안전부'
    };

    const desktopContainer = document.getElementById('authContainerDesktop');
    const mobileContainer = document.getElementById('authContainerMobile');

    if (userSession) {
        // 매핑되지 않은 값이 들어오더라도 기본적으로 '일반학생'이 출력되도록 수정
        let parsedRole = roleMapping[userSession.role] || '일반학생';
        let parsedDept = deptMapping[userSession.department] || '';
        let finalRoleText = parsedDept ? `${parsedDept} ${parsedRole}` : parsedRole;
        
        let adminButtonDesktop = '';
        let adminButtonMobile = '';
        if (userSession.role === 'admin') {
            adminButtonDesktop = `<button class="auth-btn" style="border-color: #E74C3C; color: #E74C3C;" onclick="location.href='logset.html'"><i class="fa-solid fa-gear"></i> 회원관리</button>`;
            adminButtonMobile = `<button class="auth-btn" style="width:100%; border-color: #E74C3C; color: #E74C3C; padding:10px;" onclick="location.href='logset.html'"><i class="fa-solid fa-gear"></i> 회원관리</button>`;
        }
        
        // PC: 이름 클릭 시 setaco.html 로 이동
        if (desktopContainer) {
            desktopContainer.innerHTML = `
                <div class="user-info">
                    ${adminButtonDesktop}
                    <span style="font-size:12px; background:#EEF2F7; padding:3px 8px; border-radius:12px;">${finalRoleText}</span>
                    <a href="setaco.html" class="profile-link"><i class="fa-solid fa-user"></i> <b>${userSession.name || userSession.id}</b>님</a>
                    <button class="logout-btn" onclick="logout()">로그아웃</button>
                </div>
            `;
        }
        
        // 모바일: 이름 클릭 시 setaco.html 로 이동
        if (mobileContainer) {
            mobileContainer.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px; align-items:flex-start;">
                    <span style="font-size:12px; background:#EEF2F7; padding:3px 8px; border-radius:12px; color:#475569;">${finalRoleText}</span>
                    <a href="setaco.html" class="profile-link" style="font-size:16px;"><i class="fa-solid fa-user"></i> <b>${userSession.name || userSession.id}</b>님</a>
                    ${adminButtonMobile}
                    <button class="logout-btn" style="width:100%; padding:10px;" onclick="logout()">로그아웃</button>
                </div>
            `;
        }
    }
}

window.logout = function() {
    localStorage.removeItem('userSession');
    alert("로그아웃 되었습니다.");
    window.location.reload(); 
};

function openSidebar() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    if(sidebarMenu && sidebarOverlay) {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeSidebar = function() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    if(sidebarMenu && sidebarOverlay) {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.toggleMobileDropdown = function(element) {
    const parentItem = element.parentElement;
    parentItem.classList.toggle('open');
}
