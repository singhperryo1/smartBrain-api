const handleProfileGet = (req, resp, db) => {
	const { id } = req.params ;  //getting the params of the req from the server 
	db.select('*').from('users').where({id}).then(user => {
		if (user.length)
		{
		resp.json(user[0]) ; 	
		}
		else
		{
			resp.status(400).json('Not found') ;  
		}
	})
	.catch(err => resp.status(400).json('error getting user')) ;  		
}

module.exports = {
	handleProfileGet
}