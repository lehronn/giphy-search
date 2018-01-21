var GIPHY_PUB_KEY = 'fhruhErb7kOixSYUM2EV916C9qVt2wiL';
var GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },
  handleSearch: function(searchingText) { //1.
    this.setState({
        loading: true //2.
    });
  this.getGif(searchingText, function(gif) { //3.
    this.setState({ //4.
      loading: false, //4.a.
      gif: gif, //4.b.
      searchingText: searchingText //4.c.
    });
  }.bind(this)); //Przekazywana do metody getGif funkcja wskazuje na coś innego niż komponent App, dlatego trzeba posłużyć się obejściem (metoda bind), które zachowa odpowiedni kontekst.
},
// Algorytm postępowania dla metody handleSearch jest następujący:
// 1.pobierz na wejściu wpisywany tekst
// 2.zasygnalizuj, że zaczął się proces ładowania
// 3.Rozpocznij pobieranie gifa
// 4.Na zakończenie pobierania:
// Na zakończenie pobierania:
// 4.a. przestań sygnalizować ładowanie,
// 4.b. ustaw nowego gifa z wyniku pobierania
// 4.c. ustaw nowy stan dla wyszukiwanego tekstu

getGif: function(searchingText, callback) { //1.
  var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
  var xhr = new XMLHttpRequest(); //3.
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText).data; //4.
      var gif = { //5.
        url: data.fixed_width_downsampled_url,
        sourceUrl: data.url
    };
    callback(gif); //6.
    }
  };
  xhr.send();
},
// 1.Na wejście metody getGif przyjmujemy dwa parametry: wpisywany tekst (searchingText) i funkcję, która ma się wykonać po pobraniu gifa (callback)
// 2.Konstruujemy adres URL dla API Giphy (pełną dokumentację znajdziesz pod tym adresem)
// 3.Wywołujemy całą sekwencję tworzenia zapytania XHR do serwera i wysyłamy je.
// 4.W obiekcie odpowiedzi mamy obiekt z danymi. W tym miejscu rozpakowujemy je sobie do zmiennej data, aby nie pisać za każdym razem response.data.
// 5.Układamy obiekt gif na podstawie tego co otrzymaliśmy z serwera
// 6.Przekazujemy obiekt do funkcji callback, którą przekazaliśmy jako drugi parametr metody getGif.

  render: function() {
    //zamiast przypisywania obiektu ze stylami do diva można zrobić className i użyć CSS.
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };
    return (
      <div style = {styles}>
        <h1>Giphy Search</h1>
        <p>Find GIF from <a href='http://giphy.com'>Giphy</a>. Press Enter, for more GIFs.</p>
        <Search onSearch= {this.handleSearch}/>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
