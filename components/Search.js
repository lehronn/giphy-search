Search = React.createClass({
  //inicjujemy pusty nowy stan wyszukiwanej frazy.
  getInitialState() {
    return {
      searchingText: ''
    };
  },
  //wartość value zwracanej przez klasę jest równa wartości stanu searchingText, a nie równa temu co wpisuje użytkownik.
  //napiszy więc żeby to co wpiszemy do inputa w html zostało przypisane do stanu.
  //wciskanie klawiszy to event.target.value.
  handleChange: function(event) {
    var searchingText = event.target.value;
    this.setState({searchingText: searchingText});

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function(event) {
    if (event.keyCode === 13) {  //wciśnięcie klawisza Enter.
      this.props.onSearch(this.state.searchingText);
    }
  },

  render: function() {
    var styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

    return <input
    type = "text"
    onChange = {this.handleChange}
    onKeyUp = {this.handleKeyUp}
    placeholder = 'Tutaj wpisz wyszukiwaną frazę...'
    style = {styles}
    value = {this.state.searchTerm}
    />
  }
});
