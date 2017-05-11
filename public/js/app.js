/*jshint esversion: 6 */

//GET THE ROOT ELEMENT ON THE MAIN HTML
const reactContainer = document.getElementById("root");

//DATABASE RETRIEVAL
const getCardsFromDb = () => {
  return fetch('/api/cards').then( res => res.json());
}

//TEMPLATE FOR EACH CARD DISPLAY
const Card = (props) => (
  <div className="singleCard">
    <h3>{ props.card.name }</h3>
    <p>{ props.card.priority }</p>
    <p>{ props.children }</p>
  </div>
);

// TEMPLATE FOR THE THREE COLUMNS
const CardListQueue = ({ cards, changeR }) => (
  <div className="list">
    <h2>QUEUE</h2>
    { cards
      .map( card => <Card card={card}>
        <input type="button" onClick={() => changeR(card.id)} value="Move right"/> </Card> )
    }
  </div>
);

const CardListProgress = ({ cards, changeR, changeL }) => (
  <div className="list">
  <h2>PROGRESS</h2>
    { cards
      .map( card => <Card card={card}>
       <input type="button" onClick={() => changeL(card.id)} value="Move left"/>
       <input type="button" onClick={() => changeR(card.id)} value="Move right"/> </Card>)
    }
  </div>
);

const CardListDone = ({ cards, changeL }) => (
  <div className="list">
  <h2>DONE</h2>
    { cards
      .map( card => <Card card={card}>
        <input type="button" onClick={ () => changeL(card.id)} value="Move left"/> </Card> )
    }
  </div>
);

// TEMPLATE FOR MAIN DIV
const KanbanMap = ({ cards, right, left }) => (
  <div className="mainPanel">
    <CardListQueue cards={cards.filter(card => card.status === 'Queue')} changeR={right} />
    <CardListProgress cards={cards.filter(card => card.status === 'Progress')} changeR={right} changeL={left}/>
    <CardListDone cards={cards.filter(card => card.status === 'Done')} changeL={left}/>
  </div>
);

//CLASS NEW CARD

class NewCardForm extends React.Component {

  constructor(props){
    super(props);

    // set the initial state
    this.state = {
      id: "",
      name: "",
      priority: "",
      created_by : "",
      assigned_to: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addCard(card){
    this.props.addCard(card);

    const name = "";
    const priority = "";
    const created_by = "";
    const assigned_to = "";
    this.setState({
      name,
      priority,
      created_by,
      assigned_to
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.status = "Queue";

    fetch("/api/cards/",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state)
    })
    .then(function(res){ return res.json(); })
    .then((res) => this.addCard(res));
  }

  handleNameChange(event) {
    this.setState({ name : event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority : event.target.value });
  }

  handleCreatedByChange(event) {
    this.setState({ created_by : event.target.value });
  }

  handleAssignedToChange(event) {
    this.setState({ assigned_to : event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" placeholder="name" onChange={this.handleNameChange} value={this.state.name} />
        </div>
        <div>
          <input type="text" placeholder="priority" onChange={this.handlePriorityChange} value={this.state.priority} />
        </div>
        <div>
          <input type="text" placeholder="created_by " onChange={this.handleCreatedByChange} value={this.state.created_by} />
        </div>
        <div>
          <input type="text" placeholder="assigned_to" onChange={this.handleAssignedToChange} value={this.state.assigned_to} />
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
    this.moveRight= this.moveRight.bind(this);
    this.moveLeft= this.moveLeft.bind(this);
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

  updateCards(cardArray){
    this.setState({
      cards : cardArray
    });
  }

  moveRight(id){
    let cardArray = this.state.cards.slice(0);
    let cardToUpdate = null;
    for(var i=0; i < cardArray.length; i++){
      if(cardArray[i].id === id){
        if(cardArray[i].status === "Queue"){
          cardArray[i].status = "Progress";
        } else{
          cardArray[i].status = "Done";
        }
        cardToUpdate = cardArray[i];
        break;
      }
    }

    fetch(`/api/cards/${cardToUpdate.id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({"status":cardToUpdate.status})
    })
    .then(function(res){ return res.json(); })
    .then((res) => this.updateCards(cardArray))
  }

  moveLeft(id){
    let cardArray = this.state.cards.slice(0);
    let cardToUpdate = null;
    for(var i=0; i < cardArray.length; i++){
      if(cardArray[i].id === id){
        if(cardArray[i].status === "Done"){
          cardArray[i].status = "Progress";
        } else{
          cardArray[i].status = "Queue";
        }
        cardToUpdate = cardArray[i];
        break;
      }
    }

    fetch(`/api/cards/${cardToUpdate.id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({"status":cardToUpdate.status})
    })
    .then(function(res){ return res.json(); })
    .then((res) => this.updateCards(cardArray))
  }


  render(){
    return (
      <div>
        <h1>KANBAN - CARDS</h1>
        <NewCardForm addCard={this.addCard} />
        <KanbanMap cards={this.state.cards} right={this.moveRight} left={this.moveLeft}></KanbanMap>
      </div>
    );
  }
};
ReactDOM.render(
  <App />,
  reactContainer
);
