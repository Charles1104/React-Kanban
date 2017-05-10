/*jshint esversion: 6 */

const reactContainer = document.getElementById("root");

//DATABASE RETRIEVAL
const getCardsFromDb= () => new Promise((resolve, reject) => {
  const cardsFromDb = [
    {
      card_id : '1',
      title : 'Study Javascript',
      priority: 'urgent',
      status: 'queue',
      created_by: 'Charles',
      assigned_to: 'Mattew'
    },
    {
      card_id : '2',
      title : 'Study Python',
      priority: 'Normal',
      status: 'queue',
      created_by: 'Thomas',
      assigned_to: 'Henry'
    },
    {
      card_id : '3',
      title : 'Study PHP',
      priority: 'Low',
      status: 'queue',
      created_by: 'Taylor',
      assigned_to: 'David'
    }
  ];
  setTimeout(() => resolve(cardsFromDb), 250);
});

//TEMPLATE FOR EACH CARD DISPLAY
const Card = (props) => (
  <li>
    <h3>{ props.card.title }</h3>
    <p>{ props.card.priority }</p>
  </li>
);

const CardList = ({ cards }) => (
  <ul>
    { cards
      .map( card => <Card card={card} /> )
    }
  </ul>
);


//CLASS NEW CARD

class NewCardForm extends React.Component {

  constructor(props){
    super(props);
    console.log(props);

    // set the initial state
    this.state = {
      title: "",
      priority: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addCard(card){
    // update my parent's books state
    this.props.addCard(card);

    const title = "";
    const priority = "";
    this.setState({
      title,
      priority
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addCard(this.state);
  }

  handleTitleChange(event) {
    this.setState({ title : event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority : event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" placeholder="title" onChange={this.handleTitleChange} value={this.state.title} />
        </div>
        <div>
          <input type="text" placeholder="priority" onChange={this.handlePriorityChange} value={this.state.priority} />
        </div>
        <div>
          <button type="submit">Add Card</button>
        </div>
      </form>
    )
  }
}

//MAIN APP FOR REACT
class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      cards : [],
    };

    this.addCard= this.addCard.bind(this);

  }

  componentWillMount() {
    this.getCards().then( cards => {
      this.setState({ cards });
    });
  }

  getCards(){
    return getCardsFromDb();
  }

  addCard(card){
    this.setState({
      cards : this.state.cards.concat(card)
    });
  }

  render(){
    return (
      <div>
        <h1>Hello React</h1>
        <CardList cards={this.state.cards}></CardList>
        <NewCardForm addCard={this.addCard} />
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  reactContainer
);
