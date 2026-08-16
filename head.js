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
    /* 원래 디자인 유지: max-width 1200px 복구 */
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
        flex-shrink: 0;
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
        white-space: nowrap;
    }
    
    /* 원래 디자인 유지: nav-center 기본 배치 복구 */
    .nav-center {
        display: flex;
        gap: 15px; 
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
        white-space: nowrap;
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
    
    .nav-item:hover > a i.no-rotate {
        transform: none;
    }

    .dropdown-content {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #FFFFFF;
        min-width: 120px;
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
    
    .dropdown-subheader {
        display: block;
        padding: 12px 20px 4px 20px;
        font-size: 13px;
        font-weight: 700;
        color: #333333;
        background-color: #F8FAFC;
        cursor: default;
        text-align: center;
        margin-top: 5px;
        border-top: 1px solid #F0F0F0;
    }
    .dropdown-subheader:first-child {
        margin-top: 0;
        border-top: none;
    }

    .dropdown-content a {
        color: #555555;
        padding: 10px 20px;
        font-size: 14px;
        text-decoration: none;
        font-weight: 400;
        text-align: center;
        transition: background-color 0.2s, color 0.2s;
        white-space: nowrap;
    }
    .dropdown-content a:hover {
        background-color: #F8FAFC;
        color: #7BA4DB;
        font-weight: 500;
    }
    
    .nav-right {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-shrink: 0;
    }
    
    .auth-btn {
        background-color: transparent;
        border: 1px solid #7BA4DB;
        color: #7BA4DB;
        padding: 8px 22px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
    }
    .auth-btn:hover {
        background-color: #7BA4DB;
        color: #FFFFFF;
    }

    /* 🌟 핵심 해결: 프로필을 세로(2줄)로 배치하여 가로 공간 차지 최소화 */
    .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .profile-link-compact {
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background-color 0.2s;
    }
    .profile-link-compact:hover {
        background-color: #F8FAFC;
    }
    .profile-avatar {
        font-size: 26px;
        color: #94A3B8;
    }
    .profile-text-wrap {
        display: flex;
        flex-direction: column;
        line-height: 1.3;
    }
    .profile-role {
        font-size: 11px;
        color: #64748B;
        white-space: nowrap;
    }
    .profile-name {
        font-size: 14px;
        color: #0F172A;
        font-weight: 700;
        white-space: nowrap;
    }
    .profile-name span {
        font-size: 13px;
        font-weight: 400;
    }
    
    /* 깔끔한 미니 로그아웃 버튼 */
    .logout-btn-compact {
        background: transparent;
        border: 1px solid #E2E8F0;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
        color: #64748B;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
    }
    .logout-btn-compact:hover {
        background: #F1F5F9;
        color: #0F172A;
    }

    .admin-btn {
        border-color: #FECACA !important;
        color: #EF4444 !important;
        background-color: #FEF2F2 !important;
        border-radius: 20px !important;
        padding: 6px 14px !important;
        font-size: 12px !important;
    }
    .admin-btn:hover {
        background-color: #EF4444 !important;
        color: #FFFFFF !important;
    }

    /* 모바일 사용자 카드 */
    .mobile-user-card {
        background-color: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }
    .mobile-user-header {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .mobile-user-avatar {
        width: 40px;
        height: 40px;
        background-color: #EBF3FA;
        color: #7BA4DB;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
    }
    .mobile-user-info-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .mobile-user-name {
        font-size: 15px;
        font-weight: 600;
        color: #1E293B;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .mobile-role-badge {
        font-size: 11px;
        font-weight: 600;
        color: #4A72B0;
        background-color: #FFFFFF;
        border: 1px solid #D5E3F6;
        padding: 3px 9px;
        border-radius: 20px;
        white-space: nowrap;
        align-self: flex-start;
    }
    .mobile-user-actions {
        display: flex;
        gap: 8px;
        margin-top: 4px;
    }

    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333333;
    }

    .sidebar {
        position: fixed; top: 0; right: -280px; width: 280px; height: 100%;
        background-color: #FFFFFF; box-shadow: -5px 0 25px rgba(0,0,0,0.03);
        z-index: 2000; transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 30px 25px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto;
    }
    .sidebar.active { right: 0; }
    .sidebar-close { align-self: flex-end; background: none; border: none; font-size: 24px; cursor: pointer; color: #666666; }
    
    .sidebar-menu { display: flex; flex-direction: column; gap: 10px; }
    .mobile-nav-item { display: flex; flex-direction: column; }
    .mobile-nav-link { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 500; color: #333333; padding: 12px 0; border-bottom: 1px solid #F0F0F0; text-decoration: none; cursor: pointer; }
    .mobile-nav-link i { font-size: 12px; color: #999; transition: transform 0.3s ease; }
    
    .mobile-dropdown-content { display: none; flex-direction: column; background-color: #F8FAFC; border-radius: 6px; padding: 10px 15px; margin-top: 5px; gap: 10px; }
    
    .mobile-dropdown-subheader {
        display: block;
        padding: 10px 0 2px 0;
        font-size: 14px;
        font-weight: 700;
        color: #333333;
        cursor: default;
        border-bottom: 1px solid #E2E8F0;
        margin-top: 5px;
    }
    .mobile-dropdown-subheader:first-child {
        margin-top: 0;
    }

    .mobile-dropdown-content a { font-size: 14px; color: #555555; text-decoration: none; padding: 5px 0; padding-left: 10px;}
    .mobile-dropdown-content a:hover { color: #7BA4DB; font-weight: 500; }
    
    .mobile-nav-item.open .mobile-dropdown-content { display: flex; }
    .mobile-nav-item.open .mobile-nav-link i { transform: rotate(180deg); }

    .sidebar-auth { padding-bottom: 20px; border-bottom: 1px solid #F0F0F0; }
    .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.15); z-index: 1999; display: none; }
    .sidebar-overlay.active { display: block; }

    /* 원래 모바일 분기점 1024px 복구 */
    @media (max-width: 1024px) {
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
                    <a href="anno.html">공지사항</a>
                    <a href="frinfo.html">자유게시판</a>
                </div>
            </div>
            
            <div class="nav-item">
                <a href="#">학년부 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <!-- 1학년부 -->
                    <span class="dropdown-subheader">1학년부</span>
                    <!-- 여기에 1학년부 관련 <a> 태그 추가 -->

                    <!-- 2학년부 -->
                    <span class="dropdown-subheader">2학년부</span>
                    <a href="metisign.html">멘토멘티/홈베이스 신청</a>
                    <a href="metiset.html">멘토멘티 신청관리</a>

                    <!-- 3학년부 -->
                    <span class="dropdown-subheader">3학년부</span>
                    <!-- 여기에 3학년부 관련 <a> 태그 추가 -->
                </div>
            </div>
            
            <div class="nav-item">
                <a href="#">회장단 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="preinfo.html">부서 정보</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">홍보미디어부 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="adinfo.html">부서 정보</a>
                    <a href="survey.html">설문조사</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">문화소통부 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="culinfo.html">부서 정보</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">건강안전부 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="healthinfo.html">부서 정보</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">학술문예부 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="stuinfo.html">부서 정보</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">환경보호부 <i class="fa-solid fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="envinfo.html">부서 정보</a>
                </div>
            </div>
            
            <!-- 점 3개(기타) 드롭다운 메뉴 -->
            <div class="nav-item">
                <a href="#" style="padding-left: 5px;"><i class="fa-solid fa-ellipsis no-rotate" style="font-size: 18px;"></i></a>
                <div class="dropdown-content" style="min-width: 130px;">
                    <span class="dropdown-subheader">기타</span>
                    <a href="#">사이트 정보</a>
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
    
    <div class="sidebar-auth" id="authContainerMobile">
        <button class="auth-btn" style="width: 100%;" onclick="location.href='login.html'">로그인</button>
    </div>

    <nav class="sidebar-menu">
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">알림 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="anno.html" onclick="closeSidebar()">공지사항</a>
                <a href="frinfo.html" onclick="closeSidebar()">자유게시판</a>
            </div>
        </div>
        
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">학년부 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <span class="mobile-dropdown-subheader">1학년부</span>
                <!-- 여기에 1학년부 관련 <a> 태그 추가 -->

                <span class="mobile-dropdown-subheader">2학년부</span>
                <a href="metisign.html" onclick="closeSidebar()">멘토멘티/홈베이스 신청</a>
                <a href="metiset.html" onclick="closeSidebar()">멘토멘티 신청관리</a>

                <span class="mobile-dropdown-subheader">3학년부</span>
                <!-- 여기에 3학년부 관련 <a> 태그 추가 -->
            </div>
        </div>
        
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">회장단 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="preinfo.html" onclick="closeSidebar()">부서 정보</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">홍보미디어부 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="adinfo.html" onclick="closeSidebar()">부서 정보</a>
                <a href="survey.html" onclick="closeSidebar()">설문조사</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">문화소통부 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="culinfo.html" onclick="closeSidebar()">부서 정보</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">건강안전부 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="healthinfo.html" onclick="closeSidebar()">부서 정보</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">학술문예부 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="stuinfo.html" onclick="closeSidebar()">부서 정보</a>
            </div>
        </div>
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">환경보호부 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="envinfo.html" onclick="closeSidebar()">부서 정보</a>
            </div>
        </div>
        
        <div class="mobile-nav-item">
            <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">기타 <i class="fa-solid fa-chevron-down"></i></div>
            <div class="mobile-dropdown-content">
                <a href="#" onclick="closeSidebar()">사이트 정보</a>
            </div>
        </div>
    </nav>
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

function checkLoginState() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    
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
        'content_comm': '홍보미디어부',
        'culture_comm': '문화소통부',
        'health_act': '건강안전부',
        'academic_art': '학술문예부',
        'safety_life': '환경보호부'
    };

    const desktopContainer = document.getElementById('authContainerDesktop');
    const mobileContainer = document.getElementById('authContainerMobile');

    if (userSession) {
        let parsedRole = roleMapping[userSession.role] || '일반학생';
        let parsedDept = deptMapping[userSession.department] || '';
        let finalRoleText = parsedDept ? `${parsedDept} ${parsedRole}` : parsedRole;
        
        let adminButtonDesktop = '';
        let adminButtonMobile = '';
        if (userSession.role === 'admin') {
            adminButtonDesktop = `<button class="auth-btn admin-btn" onclick="location.href='logset.html'"><i class="fa-solid fa-gear"></i></button>`;
            adminButtonMobile = `<button class="auth-btn admin-btn" style="flex: 1; padding: 8px;" onclick="location.href='logset.html'"><i class="fa-solid fa-gear"></i> 회원관리</button>`;
        }
        
        // 🌟 PC: 직책과 이름을 상하 2줄로 배치하여 가로 넓이 문제를 완벽 해결
        if (desktopContainer) {
            desktopContainer.innerHTML = `
                <div class="user-info">
                    ${adminButtonDesktop}
                    <a href="setaco.html" class="profile-link-compact">
                        <i class="fa-solid fa-circle-user profile-avatar"></i>
                        <div class="profile-text-wrap">
                            <span class="profile-role">${finalRoleText}</span>
                            <span class="profile-name">${userSession.name || userSession.id}<span>님</span></span>
                        </div>
                    </a>
                    <button class="logout-btn-compact" onclick="logout()">로그아웃</button>
                </div>
            `;
        }
        
        if (mobileContainer) {
            mobileContainer.innerHTML = `
                <div class="mobile-user-card">
                    <div class="mobile-user-header">
                        <div class="mobile-user-avatar">
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <div class="mobile-user-info-text">
                            <a href="setaco.html" class="mobile-user-name" onclick="closeSidebar()">
                                <b>${userSession.name || userSession.id}</b>님
                                <i class="fa-solid fa-angle-right" style="font-size:12px; color:#94A3B8;"></i>
                            </a>
                            <span class="mobile-role-badge">${finalRoleText}</span>
                        </div>
                    </div>
                    <div class="mobile-user-actions">
                        ${adminButtonMobile}
                        <button class="logout-btn-compact" style="flex: 1; padding: 8px; font-size:13px;" onclick="logout()">로그아웃</button>
                    </div>
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
