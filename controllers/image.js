const Clarifai =  require('clarifai') ; 


const app = new Clarifai.App({
 apiKey: '40c875c38b6f43bdb1e5c8024f46a91b'
});

const handleApiCall = (req, resp) => {

  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
resp.json(data) ; 
  })
  .catch(err => resp.status(400).json('unable to work with API'))
}

const handleImage = (req, resp, db)  =>
{
	const { id } = req.body ; 
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
	 resp.json(entries[0]) ; 
	})
	.catch(err => resp.status(400).json('unable to get entries'))  
}

module.exports = {
	handleImage, 
	handleApiCall
}