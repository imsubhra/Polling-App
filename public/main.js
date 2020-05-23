const form=document.getElementById('vote-form');
var event;
//form submit event
form.addEventListener('submit',(e)=>{
const choice=document.querySelector('input[name=app]:checked').value;
const data={app: choice};
fetch('http://localhost:3000/poll',{
    method:'post',
    body: JSON.stringify(data),
    headers:new Headers({
        'Content-Type': 'application/json'
    })
})
.then(res=>res.json())
    .catch(err => console.log(err))
e.preventDefault()
})

fetch("http://localhost:3000/poll")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            Facebook: 0,
            Whatsapp: 0,
            Instagram: 0,
            Twitter: 0,
            Other:0
        };

        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.app] = (acc[vote.app] || 0) + parseInt(vote.points)), acc),
            {}
        );

        let dataPoints = [
            { label: 'Facebook', y: voteCounts.Facebook },
            { label: 'Whatsapp', y: voteCounts.Whatsapp },
            { label: 'Instagram', y: voteCounts.Instagram },
            { label: 'Twitter', y: voteCounts.Twitter },
            { label: 'Other', y: voteCounts.Other }
        ];
    
    const chartContainer = document.querySelector('#chartContainer');
    if(chartContainer){
    
    var chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
	    exportEnabled: true,
	    theme: "light1",
        data:[
            {
                type:'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();
    
    Pusher.logToConsole = true;
    
        var pusher = new Pusher('f3b7c2ef9efdb3b6fc01', {
          cluster: 'ap2',
          encrypted:true
        });
    
        var channel = pusher.subscribe('app-poll');
        channel.bind('app-vote', function(data) {
         dataPoints.forEach((point)=>{
             if(x.label=data.app) {
                 point.y+=data.points;
                 totalVotes+=data.points;
                 event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                 document.dispatchEvent(event);
             }
         })
         chart.render(); 
        })
    }
})
