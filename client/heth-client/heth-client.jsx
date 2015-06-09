Router.route('/', function() {
  this.render('hethClient')});
Router.route('/hethClient', function() {
  this.render('hethClient')});

var HETH_PASSIVE = "http://localhost:30302"; //put your ip address here
//var HETH_PASSIVE = "http://api.blockapps.net";

Template.hethClient.rendered = function() {

/**********Transaction Factory*******/
  var TransactionFactory = React.createClass({
    getInitialState: function() {
      return {
        to_address: "",
        data:"",
        ether_amt:0,
        startgas:0,
        gasprice:0
      };
    },

    /**
     * This function will be re-bound in render multiple times. Each .bind() will
     * create a new function that calls this with the appropriate key as well as
     * the event. The key is the key in the state object that the value should be
     * mapped from.
     */
    handleInputChange: function(key, event) {
      var partialState = {};
      partialState[key] = parseFloat(event.target.value);
      this.setState(partialState);
    },

    render: function() {
      var to = this.state.to_address;
      var amt = this.state.ether_amt;
      var data = this.state.data;
      var startgas = this.state.startgas;
      var gasprice = this.state.gasprice;
      
      return (
        <div className="col-xs-5">
          <h1>Transaction Factory</h1>
          <form className="row">
            <div className="col-xs-6"> 
              <h1>To</h1><input type="text" value={to} onChange={this.handleInputChange.bind(null, 'to_address')} />
              <h1>startgas</h1><input type="number" value={startgas} onChange={this.handleInputChange.bind(null, 'startgas')} />
              </div>
            <div className="col-xs-6">
              <h1>Amount</h1><input type="number" value={amt} onChange={this.handleInputChange.bind(null, 'ether_amt')} />
              <h1>gasprice</h1><input type="number" value={gasprice} onChange={this.handleInputChange.bind(null, 'gasprice')} />
            </div>
            <div className="col-xs-12">
              <h1>Data</h1><textarea placeholder={data} onChange={this.handleInputChange.bind(null, 'data')} />
            </div>
            <button id="publish-transaction" className="btn dark-text pull-right" type="submit">Publish</button>
          </form>
        </div>
      );
    }
  });

/***********WeiTap********************/
  var WeiTap = React.createClass({
    render: function() {
      $("#priv-addr-slider").draggable({
        axis: 'x',
        containment: 'parent',
        drag: function(event, ui) {
          if (ui.position.left > 200) {
            $("#priv-addr-div").fadeOut();
          }
        },
        stop: function(event, ui) {
          if (ui.position.left < 200) {
            $(this).animate({
              left: 0
            })
          }
        }
      });
      
      return (
        <div className="col-xs-3">
          <h1>Wei Tap</h1>
          <button id="getwei" className="btn btn-success"><h3>Click for Wei</h3></button>
        </div>
      );
    }
  });

/*****************Addresses**********/
  function animateAdresses () {
    $("#priv-addr-slider").draggable({
        axis: 'x',
        containment: 'parent',
        drag: function(event, ui) {
          if (ui.position.left > 200) {
            $("#priv-addr-hide").fadeOut({
              done:function () {
                $("#priv-addr-slider").css({'left' : 0})
                $("#priv-addr-show").show();
              }
            });
          }
        },
        stop: function(event, ui) {
          if (ui.position.left < 200) {
            $(this).animate({
              left: 0
            })
          }
        }
    });
    $( "#hide-priv-addr" ).click(function() {
    $("#priv-addr-show").hide();
    $("#priv-addr-hide").show();
    });
  }

  var Addresses = React.createClass({
    componentDidMount: function() {
      animateAdresses();
    },

    render: function() {
      return (
        <div className="col-xs-4">
          <h1>Address Management</h1>
          <div id="priv-addr-hide">
            <h2><span id="priv-addr-slider" className="slider"></span> slide to reveal private key</h2>
          </div>
          <div id="priv-addr-show">
            <h4 id="priv-key">private key here</h4>
            <button id="hide-priv-addr" className="btn btn-warning">Hide</button>
          </div>
          <div>
            <button id="new-pub-addr" className="btn dark-text"><h4>New Public Address <span className="glyphicon glyphicon-plus" aria-hidden="true"></span></h4></button>
            <h3>Active Public Addresses</h3>
          </div>
        </div>
      );
    },

    componentDidUpdate: function() {
      animateAdresses();
    }
  });

/***********Client Transaction History*************/
  var ClientTransactions = React.createClass({
    render: function() {
      return (
        <div className="col-xs-6">
        <h1>Client History</h1>
        <table className="table">
          <tbody>
            <tr> 
              <th>Input Addresses</th>
              <th>Output Addresses</th>
              <th>Time</th>
              <th>Amount</th>
            </tr>
            <tr>
             <td>Hello</td>
            </tr>
          </tbody>
        </table>
      </div>
      );
    }
  });

  /***********Global Transaction History*************/
  var TransactionRow = React.createClass({
    render: function() {
      var transaction = this.props.transaction;
      console.log(transaction.from);
        return (
            <tr>
              <td>{transaction.blockNumber}</td>
              <td>{transaction.from}</td>
              <td>{transaction.to}</td>
              <td>{transaction.value}</td>
            </tr>
        );
    }
});

  var GlobalTransactions = React.createClass({
    render: function() {
      var transactions = this.props.transactions;
      console.log(this.props.transactions);

      var rows = [];
      for (var i = transactions.length - 1; i >= 0; i--) {
        transaction = transactions[i];
        rows.push(<TransactionRow transaction={transaction} key={transaction.hash} />);
      }

      return (
        <div className="col-xs-6">
        <h1>Global History</h1>
        <table className="table">
          <tbody>
            <tr>
              <th>Time</th>
              <th>Input Addresses</th>
              <th>Output Addresses</th>
              <th>Amount</th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
      );
    }
  });

/****************App***************/
  var App = React.createClass({
    getInitialState: function() {
      return {
        transactions: []
      };
    },

    render: function() {
      return (
        <div>
          <div id="transactions" className="row">
            <TransactionFactory />
            <WeiTap />
            <Addresses/>
          </div>
          <div id="logs" className="row">
            <ClientTransactions />
            <GlobalTransactions transactions={this.state.transactions}/>
          </div>
        </div>
      );
    },

    componentDidMount: function() {
      var self = this;
      function pollHethPassive(){
        $.get(HETH_PASSIVE+"/query/block?last=1")
          .done(function(data) {
            $.get(HETH_PASSIVE+"/query/transaction?blocknumber=+"+data[0].blockData.number)
              .done(function(data) {
                self.setState({transactions: data});
              });
          });
      }
      setInterval(pollHethPassive, 1000);
    }

  });
  
  React.render(<App />, $('#wrapper')[0]);
}

