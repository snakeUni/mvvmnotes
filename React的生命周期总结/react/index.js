/*
* 第一种前后props不一样
*/
class Parent extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '父传递下来的名字-蓝银草'
        }
    }
    handleClick() {
        this.setState({name: '父更新后的名字-蓝银皇'})
    }
    render() {
        return (
            <div>
                <Ele name={this.state.name} />
                <button onClick={this.handleClick.bind(this)}>点击父组件</button>
            </div>
        )
    }
} 