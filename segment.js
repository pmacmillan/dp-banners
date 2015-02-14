// problem:
//      http://www.reddit.com/r/dailyprogrammer/comments/2tr6yn/2015126_challenge_199_bank_number_banners_pt_1/
//      http://www.reddit.com/r/dailyprogrammer/comments/2u0fyx/2015126_challenge_199_bank_number_banners_pt_2/
//
// solution by:
//      Peter MacMillan <peter@macmillan.io>
//
//  _    1
// |_|  234
// |_|  567
//
//
//     8765 4321
// 1   0000 0001
// 2   0000 0010
// 4   0000 0100
// 8   0000 1000
// 16  0001 0000
// 32  0010 0000
// 64  0100 0000
// 128 1000 0000

//    _  _     _  _  _  _  _
//  | _| _||_||_ |_   ||_||_|
//  ||_  _|  | _||_|  ||_| _| 

var charmap = {
    '0': 0x7B, '1': 0x48, '2': 0x3D, '3': 0x6D, '4': 0x4e,
    '5': 0x67, '6': 0x77, '7': 0x49, '8': 0x7f, '9': 0x6f
};

function bitrow(code) {
    return (
        ((code & 0x2) ? '|' : ' ') +
        ((code & 0x4) ? '_' : ' ') +
        ((code & 0x8) ? '|' : ' '));
}


function renderChar(chr) {
    var code = charmap[chr];

    if (!code)
        throw new Error('unsupported character: "' + chr + '"');

    return [
        ((code & 0x01) ? ' _ ' : '   '),
        bitrow(code & 0x0F),
        bitrow((code & 0xF0) >> 3)
    ];
}


function charForCode(code) {
    var key;

    for (key in charmap) {
        if (charmap[key] === code) {
            return key;
        }
    }

    throw new Error('Code 0x' + code.toString(16) + ' not valid');
}

function decodebitrow(lines, row) {
    var code = 0;

    if (lines[row][0] === '|') { code += 0x02; }
    if (lines[row][1] === '_') { code += 0x04; }
    if (lines[row][2] === '|') { code += 0x08; }

    return code;
}

function decodeChar(chr) {
    var code = 0,
        lines = chr.split('\n');

    if (lines[0][1] === '_') { code += 0x01; }

    code += decodebitrow(lines, 1);
    code += (decodebitrow(lines, 2) & 0xf) << 3;

    return charForCode(code);
}


function renderLine(string) {
    var i, j, len,
        result = '',
        rendered = string.split('').map(renderChar);

    len = rendered.length;
    for (i = 0; i < 3; ++i) {
        for (j = 0; j < len; ++j) {
            result += rendered[j][i];
        }
        result += '\n';
    }

    return result;
}


function chunk(string) {
    var i, len,
        result = [],
        tmp = string.split('\n');

    len = tmp.length;
    for (i = 0; i < len; i += 3) {
        result.push([tmp[i+0], tmp[i+1], tmp[i+2]]);
        ++i; // gap between lines
    }

    return result;
}


function decodeLine(line) {
    var i, j, len,
        result = [],
        chr;

    len = line[0].length;
    for (i = 0; i < len; i += 3) {
        chr = '';

        for (j = 0; j < 3; ++j) {
            chr += line[j][i+0] + line[j][i+1] + line[j][i+2] + '\n';
        }

        result.push(decodeChar(chr));
    }

    return result.join('');
}


exports.render = function (string) {
    return string.split('\n').map(renderLine).join('\n');
};

exports.decode = function (banner) {
    return chunk(banner).map(decodeLine).join('\n');
};

