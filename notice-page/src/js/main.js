// main.js

document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementsByClassName('btn-search');

    const sql = require('mssql');
    
    const config = {
        user: 'your_username',
        password: 'your_password',
        server: 'your_server',
        database: 'your_database',
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    };
    
    // 공지사항 조회
    async function getNotices() {
        try {
            await sql.connect(config);
            const result = await sql.query`
                SELECT NoticeId, Title, CreatedDate 
                FROM Notices 
                WHERE IsDeleted = 0 
                ORDER BY CreatedDate DESC`;
            return result.recordset;
        } catch (err) {
            console.error('데이터베이스 오류:', err);
            throw err;
        }
    }
    
    // 공지사항 추가
    async function addNotice(title, content) {
        try {
            await sql.connect(config);
            const result = await sql.query`
                INSERT INTO Notices (Title, Content)
                VALUES (${title}, ${content})`;
            return result;
        } catch (err) {
            console.error('데이터베이스 오류:', err);
            throw err;
        }
    }
    
    // 공지사항 수정
    async function updateNotice(id, title, content) {
        try {
            await sql.connect(config);
            const result = await sql.query`
                UPDATE Notices 
                SET Title = ${title}, 
                    Content = ${content},
                    ModifiedDate = GETDATE()
                WHERE NoticeId = ${id}`;
            return result;
        } catch (err) {
            console.error('데이터베이스 오류:', err);
            throw err;
        }
    }
    
    // 공지사항 삭제
    async function deleteNotice(id) {
        try {
            await sql.connect(config);
            const result = await sql.query`
                UPDATE Notices 
                SET IsDeleted = 1
                WHERE NoticeId = ${id}`;
            return result;
        } catch (err) {
            console.error('데이터베이스 오류:', err);
            throw err;
        }
    }
    
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const notices = await getNotices();
            const noticeList = document.querySelector('.notice-list');
            
            notices.forEach(notice => {
                const li = document.createElement('li');
                li.className = 'notice-item';
                li.innerHTML = `
                    <div class="notice-content">
                        <h3>${notice.Title}</h3>
                        <p class="notice-date">${new Date(notice.CreatedDate).toLocaleDateString()}</p>
                    </div>
                `;
                noticeList.appendChild(li);
            });
        } catch (err) {
            console.error('공지사항 로딩 실패:', err);
        }
    });












    const addButton = document.getElementsByClassName('btn-add')[0];
    
});