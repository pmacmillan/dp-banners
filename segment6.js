// problem:
//      http://www.reddit.com/r/dailyprogrammer/comments/2tr6yn/2015126_challenge_199_bank_number_banners_pt_1/
//      http://www.reddit.com/r/dailyprogrammer/comments/2u0fyx/2015126_challenge_199_bank_number_banners_pt_2/
//
// solution by:
//      Peter MacMillan <peter@macmillan.io>
//
//  _    null 0x80 null
// |_|   0x40 0x20 0x10
// |_|   0x04 0x02 0x01
//
//    _  _     _  _  _  _  _
//  | _| _||_||_ |_   ||_||_|
//  ||_  _|  | _||_|  ||_| _| 
//
//


const CHAR_MAP = {
    '0': 0b11110101,
    '1': 0b00010001,
    '2': 0b11100011,
    '3': 0b10110011,
    '4': 0b00010111,
    '5': 0b10110110,
    '6': 0b11110110,
    '7': 0b10010001,
    '8': 0b11110111,
    '9': 0b10110111,
};

let bitrow = (code) => {
    return (
        ((code & 0b100) ? '|' : ' ') +
        ((code & 0b010) ? '_' : ' ') +
        ((code & 0b001) ? '|' : ' '));
};

let decodebitrow = (lines, row) => {
    var code = 0;

    if (lines[row][0] === '|') { code += 0b0100; }
    if (lines[row][1] === '_') { code += 0b0010; }
    if (lines[row][2] === '|') { code += 0b0001; }

    return code;
};

let renderChar = (chr) => {
    var code = CHAR_MAP[chr];

    if (!code)
        throw new Error(`unsupported character: "${chr}"`);

    return [
        ((code & 0b10000000) ? ' _ ' : '   '),
        bitrow(code & 0b00001111),
        bitrow((code & 0b01110000) >> 4)
    ];
};

let charForCode = (code) => {
    var key;

    for (key in CHAR_MAP) {
        if (CHAR_MAP[key] === code) {
            return key;
        }
    }

    throw new Error(`Code 0x${code.toString(16)} not valid`);
};


let decodeChar = (chr) => {
    let code = 0,
        lines = chr.split('\n');

    if (lines[0][1] === '_') { code += 0x80; }

    code += decodebitrow(lines, 1);
    code += (decodebitrow(lines, 2) & 0x7) << 4;

    return charForCode(code);
};


let renderLine = (string) => {
    let len,
        result = '',
        rendered = string.split('').map(renderChar);

    len = rendered.length;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < len; ++j) {
            result += rendered[j][i];
        }
        result += '\n';
    }

    return result;
}


let chunk = (string) => {
    let len,
        result = [],
        tmp = string.split('\n');

    len = tmp.length;
    for (let i = 0; i < len; i += 3) {
        result.push([tmp[i+0], tmp[i+1], tmp[i+2]]);
        ++i; // gap between lines
    }

    return result;
}


let decodeLine = (line) => {
    var len,
        result = [],
        chr;

    len = line[0].length;
    for (let i = 0; i < len; i += 3) {
        chr = '';

        for (let j = 0; j < 3; ++j) {
            chr += line[j][i+0] + line[j][i+1] + line[j][i+2] + '\n';
        }

        result.push(decodeChar(chr));
    }

    return result.join('');
};


export function render(string) {
    return string.split('\n').map(renderLine).join('\n');
}

export function decode(banner) {
    return chunk(banner).map(decodeLine).join('\n');
}

