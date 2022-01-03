const chooseBranch = () => {

    const $inputBlock = document.querySelector('.table-wrap').parentElement;
    const $errorBlock = $inputBlock.querySelector('.error-block');
    $errorBlock.classList.add('hide');

    const [$preserveDate, $preserveTime] = document.querySelectorAll('.preserve');

    $preserveDate.classList.remove('hide');
    $preserveTime.classList.remove('hide');
};

document.querySelector('.goTop').addEventListener('click', e => {

    window.scrollTo({top: 0, behavior: 'smooth'});
});

/*
    切版說明
    1.選擇縣市後彈出分行所在位置表格
    2.選擇分行後才列出日期與時間
*/
document.querySelector('#city').addEventListener('change', e => {

    const $inputBlock = e.target.parentElement;
    const $tableWrap = $inputBlock.querySelector('.table-wrap');
    const $errorBlock = $inputBlock.querySelector('.error-block');

    // 有選擇縣市
    if (e.target.value) {

        $tableWrap.classList.remove('hide');
    }

    // 沒有選擇縣市
    else {

        $tableWrap.classList.add('hide');
        $errorBlock.classList.remove('hide');
    }
});

[...document.querySelectorAll('input[name="branch"]')].forEach(el => el.addEventListener('change', e => {


    const $radioWrap = e.target.parentElement;

    const show = ($radioWrap.offsetParent !== null) // 確認 element 有沒有顯示在畫面上
    if (show && e.target.value) chooseBranch();
}))

// 第三個參數 = true , 開啟 bubble 冒泡 , 直接抓所有 input[type="checkbox"] 的 click 事件
document.querySelector('#time-wrap').addEventListener('click', e => {

    const $inputBlock = e.currentTarget.parentElement;
    const $errorBlock = $inputBlock.querySelector('.error-block');
    const $timeWrap = e.currentTarget;
    const chooseTime = $timeWrap.querySelectorAll('input[type="checkbox"]:checked').length > 0;

    if (chooseTime) $errorBlock.classList.add('hide');
    else $errorBlock.classList.remove('hide');

}, true);

document.querySelector('#date').addEventListener('change', e => {

    const $inputBlock = e.target.parentElement;
    const $errorBlock = $inputBlock.querySelector('.error-block');

    if (e.target.value === '2021/07/25(日)') $errorBlock.classList.remove('hide');
    else $errorBlock.classList.add('hide');
});