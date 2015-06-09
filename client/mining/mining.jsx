Router.route('/mining', function() {
  this.render('mining')});

Template.mining.rendered = function() {

  var HUD = React.createClass({
    render: function() {
      return (
        <div className="row">
          <div className="col-xs-2 big-info bestblock text-info">
            <div className="pull-left icon-full-width">
              <i className="icon-block"></i>
            </div>
            <div className="big-details-holder">
              <h5 className="text-uppercase">Last Block</h5>
              <h1>#531,446</h1>
            </div>
          </div>
          <div className="col-xs-2 big-info uncleCount text-info">
            <div className="pull-left icon-full-width">
              <i className="icon-uncle"></i>
            </div>
            <div className="big-details-holder">
              <h5 className="text-uppercase">Uncles</h5>
              <h1>0</h1>
            </div>
          </div>
          <div className="col-xs-2 big-info blocktime text-info">
            <div className="pull-left icon-full-width">
              <i className="icon-time"></i>
            </div>
            <div className="big-details-holder">
              <h5 className="text-uppercase">Block Mined</h5>
              <h1>1 s ago</h1>
            </div>
          </div>
          <div className="col-xs-2 big-info difficulty text-danger">
            <div className="pull-left icon-full-width">
              <i className="icon-difficulty"></i>
            </div>
            <div className="big-details-holder">
              <h5 className="text-uppercase">Local Difficulty</h5>
              <h3 className="big-details">
              <span className="small-text">27,488,352,228</span></h3>
            </div>
          </div>
          <div className="col-xs-2 big-info difficulty text-warning">
            <div className="pull-left icon-full-width">
              <i className="icon-hashrate"></i>
            </div>
            <div className="big-details-holder">
              <h5 className="text-uppercase">Local Hashrate</h5>
              <h1 ng-bind-html="avgHashrate | networkHashrateFilter" className="big-details ng-binding">3 <small className="text-warning">GH/s</small>
              </h1>
            </div>
          </div>
          <div className="col-xs-2 big-info difficulty text-warning">
            <div className="pull-left icon-full-width">
              <i className="icon-hashrate"></i>
            </div>
            <div className="big-details-holder">
              <h5 className="text-uppercase">Uptime</h5>
              <h1> 1 <small className="text-warning">day</small>
              </h1>
            </div>
          </div>
        </div>
      );
    }
  });

  var Charts = React.createClass({
    render: function() {
      return (
        <div className="row">
          <h1 className="col-xs-3">Node Name</h1>
          <div className="col-xs-3">
            <h3>Hashrate</h3>
            <canvas id="hashrate-chart" className="match-parent"></canvas>
          </div>
          <div className="col-xs-3">
            <h3>Propagation Delay</h3>
            <canvas id="propagation-chart" className="match-parent"></canvas>
          </div>
          <div className="col-xs-3">
            <h3>Latency</h3>
            <canvas id="latency-chart" className="match-parent"></canvas>
          </div>
        </div>
      );
    }
  });

  var BlockchainLog = React.createClass({
    render: function() {
      return (
        <div>
          <h1>Blockchain</h1>
          <table className="table">
            <tbody>
              <tr> 
                <th>TImestamp</th>
                <th>Block Height</th>
                <th>Blockhash</th>
                <th>Difficulty</th>
                <th>Uncles</th>
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

  var PendingLog = React.createClass({
    render: function() {
      return (
        <div>
          <h1>Pending Transactions</h1>
          <table className="table">
            <tbody>
              <tr> 
                <th>TImestamp</th>
                <th>Source</th>
                <th>Destination</th>
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

  var EthereumHLog = React.createClass({
    render: function() {
      return (
        <div className="col-xs-6">
          <h1>ethereumH Log</h1>
          <table className="table">
            <tbody>
              <tr> 
                <th>TImestamp</th>
              </tr>
              <tr>
               <td className="col-xs-3">Hello</td>
               <td className="col-xs-9">World</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  });

  React.render(
    <div>
      <HUD />
      <Charts />
      <div className="row">
        <div className="col-xs-6">
          <BlockchainLog /> 
          <PendingLog />
        </div>
        <EthereumHLog />
      </div>
    </div>,
    $('#wrapper')[0]
    );

  var propagationDataSet = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Propagation Time",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Average Propagation Time",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
  };

  var latencyDataSet = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Latency",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Average Latency",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
  };

var hashrateDataSet = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Hashrate",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Average Hashrate",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
  };
  
  var propagationChart = new Chart($("#propagation-chart").get(0).getContext("2d")).Bar(propagationDataSet, {responsive: true});
  var latencyChart = new Chart($("#latency-chart").get(0).getContext("2d")).Bar(latencyDataSet, {responsive: true});
  var hashrateChart = new Chart($("#hashrate-chart").get(0).getContext("2d")).Line(hashrateDataSet, {responsive: true});
}