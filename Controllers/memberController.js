const Member = require('../Models/member'); // Apne Model ka path check kar lena

// @desc    Get Member by Mobile Number for Billing
// @route   GET /members/billing/:mobile
exports.getMemberByMobile = async (req, res) => {
    try {
        const { mobile } = req.params;

        // Mobile number se dhoondo aur membership plan ki details bhi saath lao
        const member = await Member.findOne({ mobileNo: mobile }).populate('membership');

        if (!member) {
            return res.status(404).json({ 
                success: false, 
                message: "Bhai, ye number register nahi hai!" 
            });
        }

        res.status(200).json({
            success: true,
            member
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};