import Notification from '../schemas/Notification'
import User from '../models/User';
import Appointment from '../models/Appointment';

class NotificationController {
    async index(req, res){
        const check_is_provider = await User.findOne({
            where: {id: req.userId, provider: true}
        });

        if (!check_is_provider) {
            return res
                .status(400)
                .json({ error: 'Only providers can load notifications' });
        }

        const notifications = await Notification.find({
            user: req.userId,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.json(notifications);
    }

    async update(req, res){

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        return res.json(notification);
    }
}

export default new NotificationController();