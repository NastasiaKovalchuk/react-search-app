import { Component } from 'react';

class SearchSection extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Item Search</h1>
          <div>
            <input type='text' placeholder='Type to search...' />
            <button>Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchSection;
