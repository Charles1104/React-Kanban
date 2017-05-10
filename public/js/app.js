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
      status: 'progress',
      created_by: 'Thomas',
      assigned_to: 'Henry'
    },
    {
      card_id : '3',
      title : 'Study PHP',
      priority: 'Low',
      status: 'done',
      created_by: 'Taylor',
      assigned_to: 'David'
    }
  ];
  setTimeout(() => resolve(cardsFromDb), 250);
});

//TEMPLATE FOR EACH CARD DISPLAY
const Card = (props) => (
  <div>
    <h3>{ props.card.title }</h3>
    <p>{ props.card.priority }</p>
  </div>
);

// TEMPLATE FOR THREE COLMUNS
const CardListQueue = ({ cards }) => (
  <div className="list">
    <h2>QUEUE</h2>
    { cards
      .map( card => <Card card={card} /> )
    }
  </div>
);

const CardListProgress = ({ cards }) => (
  <div className="list">
  <h2>PROGRESS</h2>
    { cards
      .map( card => <Card card={card} /> )
    }
  </div>
);

const CardListDone = ({ cards }) => (
  <div className="list">
  <h2>DONE</h2>
    { cards
      .map( card => <Card card={card} /> )
    }
  </div>
);

// TEMPLATE FOR MAIN DIV
const KanbanMap = ({ cards }) => (
  <div className="mainPanel">
    <CardListQueue cards={cards.filter(card => card.status === 'queue')}/>
    <CardListProgress cards={cards.filter(card => card.status === 'progress')}/>
    <CardListDone cards={cards.filter(card => card.status === 'done')}/>
  </div>
);

//CLASS NEW CARD

class NewCardForm extends React.Component {

  constructor(props){
    super(props);

    // set the initial state
    this.state = {
      title: "",
      priority: "",
      created_by: "",
      assigned_to: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addCard(card){
    // update my parent's books state
    this.props.addCard(card);

    const title = "";
    const priority = "";
    const created_by = "";
    const assigned_to = "";
    this.setState({
      title,
      priority,
      created_by,
      assigned_to
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
          <input type="text" placeholder="title" onChange={this.handleTitleChange} value={this.state.title} />
        </div>
        <div>
          <input type="text" placeholder="priority" onChange={this.handlePriorityChange} value={this.state.priority} />
        </div>
        <div>
          <input type="text" placeholder="created_by" onChange={this.handleCreatedByChange} value={this.state.created_by} />
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
        <h1>KANBAN - CARDS</h1>
        <NewCardForm addCard={this.addCard} />
        <KanbanMap cards={this.state.cards}></KanbanMap>
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  reactContainer
);
