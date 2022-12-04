const pg = require('../../../lib/pg');

exports.handler = async () => {
  const db = await pg.connect();

  // 어제 시간 생성 (UTC 기준)
  const yesterday = new Date(Date.now() - 24 * 3600 * 1000);
  const dd = String(yesterday.getDate()).padStart(2, '0');
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
  const yyyy = yesterday.getFullYear();

  try {
    await db.query('BEGIN');

    // 기존 is_yesterday 포스트 false로 변경
    await db.query(
      `
        UPDATE posts
        SET is_yesterday = false
        WHERE is_yesterday = true
      `
    );

    // 어제 작성된 포스트 is_yesterday 값 true로 변경
    await db.query(
      `
        UPDATE posts
        SET is_yesterday = true
        WHERE created_at >= to_timestamp('${yyyy}-${mm}-${dd} 15:00:00' , 'YYYY-MM-DD HH24:MI:SS')
      `,
    );

    // 쿼리 커밋
    await db.query('COMMIT');
    console.log('success');
  } catch (e) {
    // 쿼리 롤백
    await db.query('ROLLBACK');
    console.error(e);
  } finally {
    db.release();
    console.log('end');
  }
};
