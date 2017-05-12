/*jshint esversion: 6 */

//GET THE ROOT ELEMENT ON THE MAIN HTML
const reactContainer = document.getElementById("root");

//DATABASE RETRIEVAL
const getCardsFromDb = () => {
  return fetch('/api/cards').then( res => res.json());
}

//TEMPLATE FOR EACH CARD DISPLAY
const Card = (props) => (
  <div className= {props.status} >
    <div className= "text">
      <h3>{ props.card.name }</h3>
      <p> <span>Priority:</span> { props.card.priority }</p>
      <p> <span>Assigned to:</span> { props.card.Assignor.name}</p>
      <p> <span>Created by:</span> { props.card.Creator.name }</p>
      <p> <span>Priority:</span> { props.card.priority }</p>
      <p> <span>Created at:</span> { props.card.createdAt.slice(0,10).concat(' | ', props.card.createdAt.slice(11,16)) }</p>
    </div>
    <div className="buttons">
      { props.children }
    </div>
  </div>
);

// TEMPLATE FOR THE THREE COLUMNS
const CardListQueue = ({ cards, changeR }) => (
  <div className="list">
    <h2>QUEUE</h2>
    { cards
      .map( card => <Card card={card} status="queue">
        <input className="buttonR" type="button" onClick={() => changeR(card.id)} value="Move right"/> </Card> )
    }
  </div>
);

const CardListProgress = ({ cards, changeR, changeL }) => (
  <div className="list">
  <h2>PROGRESS</h2>
    { cards
      .map( card => <Card card={card} status="progress">
       <input className="buttonL" type="button" onClick={() => changeL(card.id)} value="Move left"/>
       <input className="buttonR" type="button" onClick={() => changeR(card.id)} value="Move right"/> </Card>)
    }
  </div>
);

const CardListDone = ({ cards, changeL }) => (
  <div className="list">
  <h2>DONE</h2>
    { cards
      .map( card => <Card card={card} status="done">
        <input className="buttonL" type="button" onClick={ () => changeL(card.id)} value="Move left"/> </Card> )
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
    .then(() => fetch('/api/cards')).then( res => res.json())
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
      <div >
        <form className="addPanel" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="name" onChange={this.handleNameChange} value={this.state.name} />
          <select onChange={this.handlePriorityChange}>
            <option disable selected value>Priority</option>
            <option value="Low">Low</option>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
          <input type="text" placeholder="created_by " onChange={this.handleCreatedByChange} value={this.state.created_by} />
          <input type="text" placeholder="assigned_to" onChange={this.handleAssignedToChange} value={this.state.assigned_to} />
          <button className="buttonL" type="submit">Add Card</button>
        </form>
      </div>
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
    this.fetchData= this.fetchData.bind(this);
    this.moveRight= this.moveRight.bind(this);
    this.moveLeft= this.moveLeft.bind(this);
  }

  componentWillMount() {
    this.getCards().then( cards => {
      this.setState({ cards });
      console.log(cards);
    });
  }

  getCards(){
    return getCardsFromDb();
  }

  addCard(cards){
    this.setState({
      cards : cards
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
    this.fetchData(`/api/cards/${cardToUpdate.id}`, cardArray, cardToUpdate)
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
    this.fetchData(`/api/cards/${cardToUpdate.id}`, cardArray, cardToUpdate)
  }

  fetchData(path, cardArray, cardToUpdate){
    fetch(path,{
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
    );props.addC
  }
};
ReactDOM.render(
  <App />,
  reactContainer
);
