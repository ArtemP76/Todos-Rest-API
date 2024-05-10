function randomToken (length=10) {
    let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    var str = '';
    for (var i = 0; i < length; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}
exports.randomToken = randomToken