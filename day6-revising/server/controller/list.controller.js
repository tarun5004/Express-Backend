let list = require('../models/list.model');

let createlistcontroller = async (req ,res ) => {
    try {
        let {taskname, description, status} = req.body;

        if(!taskname || !description || !status){
            return res.status(400).json({
                Message: "All fields are required",
                error: "Bad Request"
            })
        }
        let newlist = await list.create({
            taskname,
            description,
            status
        })
        return res.status(201).json({
            Message: "List created successfully",
            data: newlist
        })
    } catch (error) {
        return res.status(500).json({
            Message: "Internal Server Error",
            Error: error.message
        })
    }
}

let getAlllistcontroller = async (req ,res ) => {
    try {
        let allList = await list.find();
        
        if(!allList || allList.length === 0){
            return res.status(404).json({
                success: false,
                Message: "No List found"
            })
        }
        return res.status(200).json({
            success: true,
            Message: "List fetched successfully",
            data: allList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            Message: "Internal Server Error",
            Error: error.message
        })
    }
}

// update list controller
let updateListcontroller = async (req ,res ) => {
    try {
        const {id} = req.params;
        let {taskname, description, status} = req.body;

        if(!id){
            return res.status(400).json({
                success: false,
                Message: "ID is required"
            });
        }

        if(!taskname && !description && !status) {
            return res.status(400).json({
                success: false,
                Message: "At least one field is required to update"
            })
        }
        const updatedList = await list.findByIdAndUpdate(
            id,
            {taskname, description, status},
            {new: true}
        )
        return res.status(200).json({
            success: true,
            Message: "List updated successfully",
            data: updatedList
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            Message: "Internal Server Error",
            Error: error.message
        })
    }
}

let deleteListcontroller = async (req ,res ) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                Message: "ID is required"
            });
        }

        const deletedList = await list.findByIdAndDelete(id);

        if(!deletedList){
            return res.status(404).json({
                success: false,
                Message: "List not found"
            });
        }

        return res.status(200).json({
            success: true,
            Message: "List deleted successfully",
            data: deletedList
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            Message: "Internal Server Error",
            Error: error.message
        })
    }
}

module.exports = {
    createlistcontroller,
    getAlllistcontroller,
    updateListcontroller,
    deleteListcontroller
}
