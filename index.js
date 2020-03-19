/**
 * For the Cloud functions to start the server when a website is pinged.
 */
  /**
* Start the Minecraft server, return the external IP, and create a FW rule
*/
const http = require('http');
const Compute = require('@google-cloud/compute');
const compute = new Compute();
const zone = compute.zone('us-west2-a');
const vm = zone.vm('mc-server');
const fwname = 'minecraft-fw-rule-' + Math.floor(new Date() / 1000);
 
async function get_server_ip() {
 return new Promise(function(resolve, reject) {
   vm.getMetadata(function(err, metadata, apiResponse) {
     resolve(metadata.networkInterfaces[0].accessConfigs[0].natIP);
   });
 });
}
 
async function check_if_server_is_ready() {
 const server_ip = await get_server_ip();
 const ready = !!server_ip;
 return ready
}
 
async function sleep(milliseconds) {
 return new Promise(function(resolve, reject) {
   setTimeout(resolve, milliseconds);
 });
}
 
exports.startInstance = async function startInstance(req, res) {
 // Start the VM
 const zone = compute.zone('us-west2-a');
 const vm = zone.vm('mc-server');
 console.log('about to start a VM');
 vm.start(function(err, operation, apiResponse) {
   console.log('instance start successfully');
 });
 console.log('the server is starting');
 while(!(await check_if_server_is_ready())) {
   console.log('Server is not ready, waiting 1 second...');
   await sleep(1000);
   console.log('Checking server readiness again...');
 }
 console.log('the server is ready');
 const server_ip = await get_server_ip();
 
 // Record the function caller's IPv4 address
 console.log(JSON.stringify(req.headers));
 sourceIp = req.get('X-Forwarded-For');
 let callerip = req.query.message || req.body.message || sourceIp;
 
 // Set the Firewall configs
 const config = {
   protocols: {tcp: [25565]},
   ranges: [callerip + '/32'],
   tags: ['minecraft-server']
 };
 function callback(err, firewall, operation, apiResponse) {}
 
 // Create the Firewall
 compute.createFirewall(fwname, config, callback);
 
 res.status(200).send('Starting Daniel\'s minecraft server (this may take a minute)! <br />' +  'Connect through sosboss.tk<br /><br />' + 'The IP address of the Minecraft server is: ' + server_ip + ':25565<br />Your IP address is ' + callerip);
};
