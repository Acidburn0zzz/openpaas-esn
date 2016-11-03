'use strict';

const expect = require('chai').expect;

describe('The utils ldap core module', function() {
  let getModule;

  before(function() {
    getModule = () => this.helpers.requireBackend('core/ldap/utils');
  });

  describe('The buildSearchFilter fn', function() {
    it('should return correct custom searchFilter', function() {
      const mapping = {
        firstname: 'first',
        lastname: 'last'
      };
      const search = 'a';
      const expectSearchFilter = '(|(first=*a*)(last=*a*))';

      expect(getModule().buildSearchFilter(mapping, search)).to.equal(expectSearchFilter);
    });
  });

  describe('The getUniqueAttr fn', function() {
    it('should return correct unique attribute', function() {
      const ldapSearchFilter = '(email={{username}})';
      const expectUniqueAttr = 'email';

      expect(getModule().getUniqueAttr(ldapSearchFilter)).to.equal(expectUniqueAttr);
    });
  });

  describe('The aggregate fn', function() {
    it('should return an correct array when limit is less than total of items', function() {
      const A = ['a1', 'a2', 'a3', 'a4'];
      const B = ['b1', 'b2'];
      const C = ['c1', 'c2', 'c3'];
      const limit = 7;

      const expectArray = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3'];

      expect(getModule().aggregate([A, B, C], limit)).to.deep.equal(expectArray);
    });

    it('should return an correct array when limit is greater than total of items', function() {
      const A = ['a1', 'a2', 'a3', 'a4'];
      const B = ['b1', 'b2'];
      const limit = 20;

      const expectArray = ['a1', 'b1', 'a2', 'b2', 'a3', 'a4'];

      expect(getModule().aggregate([A, B], limit)).to.deep.equal(expectArray);
    });

    it('should return an correct array when one of list arrays too small', function() {
      const A = ['a1', 'a2', 'a3', 'a4'];
      const B = ['b1', 'b2', 'b3', 'b4'];
      const C = ['c1'];
      const limit = 6;

      const expectArray = ['a1', 'b1', 'c1', 'a2', 'b2', 'a3'];

      expect(getModule().aggregate([A, B, C], limit)).to.deep.equal(expectArray);
    });
  });
});
