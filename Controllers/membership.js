const Membership = require('../Modals/membership');


exports.addMembership = async (req, res) => {
  try{
    const {months,price} = req.body;

    const membership = await Membership.findOne({gym:req.gym._id,months});

    if(membership){
       membership.price = price;
       await membership.save();
       res.status(200).json({ message: 'Membership plan updated successfully'});
    } else {
      const newMembership = new Membership({
        gym: req.gym._id,
        months: months,
        price: price
      });
      await newMembership.save();
      res.status(200).json({ message: 'Membership plan created successfully', data:newMembership});
    }

  }catch(err){
    res.status(500).json({ error: 'Server Error' });
  }
}


exports.getMembership = async (req, res) => {
   try{
        const loggedInId = req.gym._id;
        const memberShip = await Membership.find({ gym: loggedInId });
        res.status(200).json({
            message:"Membership Fetched retrieved successfully",
            membership: memberShip
        });
   }catch(err){
        res.status(500).json({ error: 'Server Error' });
   }
}    