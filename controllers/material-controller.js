const Material  = require('../models/Material');


//add a material
const addMaterial = async (req, res, next) => {
    const {name, material_link, category} = req.body;
    let newmaterial;
    try{
        newmaterial = new Material({
            name,
            material_link,
            category,
        });
        await newmaterial.save();
}catch (err){
    console.log(err);
}
if(!newmaterial){
    return res.status(404).json({message:'Material not added'})
}
res.status(201).json({newmaterial});
}

//update material
const updateMaterial =async (req, res, next) => {
    const id = req.params.id;
    const {name, material_link, category} = req.body;
    let newmaterial;
    try{
        newmaterial = await Material.findByIdAndUpdate(id, {
            name,
            material_link,
            category,
           
    })
    newmaterial = await newmaterial.save()
    }catch(err){
    console.log(err);
        }
    if(!newmaterial){
        return res.status(404).json({message:'Unable to update Matrial'})
        
        
    }
    console.log("Material updated",newmaterial);
    return res.status(200).json({newmaterial});
}

//get all materials
const getAllMaterials = async (req, res, next) => {
    let materials;
    try{
        materials = await Material.find()
    }catch(err){
        console.log(err);
    }
    if(!materials){
        return res.status(404).json({message:'No materials found'})
    }
    res.status(200).json({materials});
}



//find a material by id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let material;
    try{
        material = await Material.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!material){
        return res.status(404).json({message:'Material not found'})
    }
    return res.status(200).json({material});
}


//find a materials by category
const getByCategory = async (req, res, next) => {
    const category = req.params.category;
    let material;
    try{
        material = await Material.find({category: category});
    }catch(err){
        console.log(err);
    }

    if(!material){
        return res.status(404).json({message:'Material not found'})
        console.log("material not found");
    }
    return res.status(200).json({material});
}


//delete a material
const deleteMaterial = async (req, res, next) => {
    const id = req.params.id;
    let material;
    try {
      material = await Material.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
    if (!material) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  };


// exports.getAllMaterials = getAllMaterials;
// exports.addMaterial = addMaterial;
// exports.getById = getById;
// exports.deleteMaterial = deleteMaterial;
// exports.getByCategory = getByCategory;
// exports.updateMaterial = updateMaterial;


module.exports = {
    getAllMaterials:getAllMaterials,
    addMaterial : addMaterial,
    getById : getById,
    deleteMaterial : deleteMaterial,
    getByCategory : getByCategory,
    updateMaterial : updateMaterial,
    
  }