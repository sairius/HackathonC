import requestPost from './common/request.js';

async function cancelReservation(target) {
  try {
    await requestPost('/cancel-reservation', { 'reserinfoId': target.getAttribute('data-reserinfo-id')});
    const strList = target.closest('li').innerText.split(' ');
    const message = `以下の日程の利用をキャンセルしました。\n【利用日】${strList[0]}\n【時間帯】${strList[1]}`;
    requestPost('/post-message', { message, channelId: target.getAttribute('data-channel-id')});
  } catch (error) {
    console.log(error.message);
    alert('正常にキャンセルができなかった場合があります。\n申請一覧をご確認ください。');
  } finally {
    location.reload();
  }
}

// ページが読み込まれたときの処理
document.addEventListener('DOMContentLoaded', function() {
  const signupShowButton = document.querySelector('.signup-show');
  const signupModal = document.getElementById('signup-modal');
  const closeModalButton = document.getElementById('close-modal');

  // モーダル表示ボタンがクリックされたときの処理
  signupShowButton.addEventListener('click', function() {
      signupModal.style.display = 'block';
  });

  // モーダル閉じるボタンがクリックされたときの処理
  closeModalButton.addEventListener('click', function() {
      signupModal.style.display = 'none';
  });

  document.querySelectorAll('.cancelbtn').forEach((cancelButton) => {
    cancelButton.addEventListener('click', (event) => { cancelReservation(event.target); });
  });
});
