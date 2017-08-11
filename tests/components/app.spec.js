import { mount } from 'avoriaz';
import { expect } from 'chai';
import App from 'components/App.vue';

describe('App', function () {
  it('renders ok', function () {
    const wrapper = mount(App);
    expect(wrapper.html()).to.be.ok; 
  });
});
