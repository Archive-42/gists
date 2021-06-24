class ClassComponentWithState extends Component {
    state = {
        someData: 8
    };

    render() {
        return (
            <div>{`Here's some data to render: ${this.state.someData}`}</div>
        );
    }
}

export default ClassComponentWithState;