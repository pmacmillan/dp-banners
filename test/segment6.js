
var assert = require('assert');
var segment = require('../segment6.compiled');

it('renders single numbers', function () {
    assert.equal(segment.render('0'), ' _ \n| |\n|_|\n');
    assert.equal(segment.render('1'), '   \n  |\n  |\n');
    assert.equal(segment.render('2'), ' _ \n _|\n|_ \n');
    assert.equal(segment.render('3'), ' _ \n _|\n _|\n');
    assert.equal(segment.render('4'), '   \n|_|\n  |\n');
    assert.equal(segment.render('5'), ' _ \n|_ \n _|\n');
    assert.equal(segment.render('6'), ' _ \n|_ \n|_|\n');
    assert.equal(segment.render('7'), ' _ \n  |\n  |\n');
    assert.equal(segment.render('8'), ' _ \n|_|\n|_|\n');
    assert.equal(segment.render('9'), ' _ \n|_|\n _|\n');
});

it('renders a string of numbers', function () {
    assert.equal(segment.render('0123456789'), ' _     _  _     _  _  _  _  _ \n| |  | _| _||_||_ |_   ||_||_|\n|_|  ||_  _|  | _||_|  ||_| _|\n');
});


it('renders multiple lines of numbers', function () {
    var expected =
        ' _  _  _  _  _  _  _  _  _ \n' +
        '| || || || || || || || || |\n' +
        '|_||_||_||_||_||_||_||_||_|\n' +
        '\n' +
        '                           \n' +
        '  |  |  |  |  |  |  |  |  |\n' +
        '  |  |  |  |  |  |  |  |  |\n' +
        '\n' +
        '    _  _  _  _  _  _     _ \n' +
        '|_||_|| || ||_   |  |  ||_ \n' +
        '  | _||_||_||_|  |  |  | _|\n';

    assert.equal(segment.render('000000000\n111111111\n490067715'), expected);
});


it('can decode it\'s own output', function () {
    assert.equal(segment.decode(segment.render('0123456789\n9876543210')), '0123456789\n9876543210');
    assert.equal(segment.decode(segment.render('12345')), '12345');
    assert.equal(segment.decode(segment.render('0\n1\n2')), '0\n1\n2');
});
