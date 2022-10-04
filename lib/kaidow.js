'use babel';

import KaidowView from './kaidow-view';
import { CompositeDisposable } from 'atom';

export default {

  kaidowView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.kaidowView = new KaidowView(state.kaidowViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.kaidowView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'kaidow:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.kaidowView.destroy();
  },

  serialize() {
    return {
      kaidowViewState: this.kaidowView.serialize()
    };
  },

  toggle() {
    console.log('Kaidow was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
