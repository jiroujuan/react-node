export function getRedirectPath({type, avatar}) {
    console.log(type);
    let url = (type === 'boss')?'/boss':'/genius'

    if (!avatar){
        url += 'info'
    }
    /* 我是一个袁粤坤测试git */
    return url
}