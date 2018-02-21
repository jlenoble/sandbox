import Muter, {captured} from 'muter';
import {expect} from 'chai';
import Sandbox from '../src/sandbox';

describe('Testing Sandbox', function () {
  const muter = Muter(console, 'log'); // eslint-disable-line new-cap

  it(`Class Sandbox says 'Hello world!'`, captured(muter, function () {
    new Sandbox();
    expect(muter.getLogs()).to.equal('Hello world!\n');
  }));
});
