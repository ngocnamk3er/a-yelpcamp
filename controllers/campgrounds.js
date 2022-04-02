const Campground = require('../models/campground')
const ExpressError = require('../utils/ExpressError')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}
module.exports.getNew = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.getId = async(req, res) => {
    // try {
        const campground = await Campground.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author')
        if (!campground) {
            req.flash('error', "Cannot find that campground")
            return res.redirect('/campgrounds')
        } else {
            res.render('campgrounds/show', { campground })
        }
    // } catch (e) {
    //    throw(e)
    // }
}
module.exports.postNew = async (req, res) => {
    try {
        if(!req.body.campground) throw new Error('Invalid campground data',400)
        const campground = new Campground(req.body.campground)
        campground.author = req.user._id
        await campground.save()
        req.flash('success', 'Successfully made a new campground')
        res.redirect(`/campgrounds/${campground._id}`)
    } catch (error) {
        throw error
    }
}
module.exports.getEdit = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', "Cannot find that campground")
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })
}
module.exports.putEdit = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground)
    req.flash('success', 'Successfully edited a new campground')
    res.redirect(`/campgrounds/${id}`)
}
module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id, req.body.campground)
    req.flash("success", "Successfully deleted campground")
    res.redirect(`/campgrounds`)
}