const userModel = require('../model/user')

async function userCreate(req, res)
{
    let payload = req.body
    try{
        let data = await userModel.create(payload)
        
            return res.status(200).json({
                success: true,
                message:"User Created",
                data: data
            })
        
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: error.message
        })
    }

}

async function getAllUser(req, res)
{
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    try
    {
        const count = await userModel.countDocuments(); 
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit; 

        let data = await userModel.find().skip(skip).limit(limit); 

        if(data)
        {
            return res.status(200).json({
                success: true,
                message:"All User Data",
                data: data,
                totalPages: totalPages,
                currentPage: page
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

async function updateUser(req, res){
    if(!req.body.id)
    {
        return res.status(401).json({
            success: false,
            error:error.message
        })
    }
    let payload = {}
    if(req.body.name) Object.assign(payload, {name: req.body.name})
    if(req.body.email) Object.assign(payload, {email: req.body.email})
    if(req.body.phone) Object.assign(payload, {phone: req.body.phone})
    if(req.body.gender) Object.assign(payload, {gender: req.body.gender})
    if(req.body.DOB) Object.assign(payload, {DOB: req.body.DOB})

    try {
        let data = await userModel.findByIdAndUpdate({_id: req.body.id},payload,{new:true})
        if(data)
        {
            return res.status(200).json({
                success: true,
                message:`User ${data.name} information as been Updated`,
                data:data
            })
        }
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            error:error.message
        })
    }       
}

async function deleteUser(req, res)
{
    if(!req.body.id)
    {
        return res.status(401).json({
            success: false,
            error:error.message
        })
    }
    try
    {
        let data  = await userModel.deleteMany()
        if(data)
        {
            return res.status(200).json({
                success: true,
                message:`User Details as been Deleted`,
                data:data
            })
        }

    } catch(error)
    {
        return res.status(500).json({
            success: false,
            error:error.message
        })
    }
}

async function deleteUserById(req, res) {
   
    if (!req.body.id || !Array.isArray(req.body.id) || req.body.id.length === 0) {
        return res.status(400).json({
            success: false,
            error: "Invalid or empty ID array"
        });
    }

    try {
        const deletedUsers = [];
        for (const id of req.body.id) {
            const data = await userModel.findByIdAndDelete({_id: id});
            if (data) {
                deletedUsers.push(data);
            }
        }

        if (deletedUsers.length > 0) {
            return res.status(200).json({
                success: true,
                message: `${deletedUsers.length} user deleted successfully`,
                data: deletedUsers
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "No user found with the provided ID"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    userCreate,
    getAllUser,
    updateUser,
    deleteUser,
    deleteUserById
}