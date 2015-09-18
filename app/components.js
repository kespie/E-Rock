var switch1 = false;

var MyComponent = React.createClass({
    render: function(){
        var element = null
        if(switch1) {
            element = <h1>Hello, world!</h1>;
        }
        else {
            element =
                <div> <h1 style={{border:'solid 1px black'}}>Hello, test!</h1>
                    <h2>TEST</h2>
                </div>;
        }
        return (
            element
        );
    }
});

React.render(
    <MyComponent/>,
    document.getElementById('myDiv')
);