import { Component } from 'react';

class BuggyButton extends Component {
  state = { shouldThrow: false };

  handleThrow = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test Error: Application crashed as requested!');
    }

    return (
      <button
        onClick={this.handleThrow}
        className='text-[10px] text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest mt-4'
      >
        [ Execute Test Crash ]
      </button>
    );
  }
}

export default BuggyButton;
