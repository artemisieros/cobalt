import Joi from 'joi';

export const mainBody = Joi.object({
    url: Joi.string().required(),
    vQuality: Joi.string().allow('144', '240', '360', '480', '720', '1080', '1440', '2160', '4320', 'max').default('max'),
    aFormat: Joi.string().allow('mp3', 'ogg', 'wav', 'opus', 'flac').default('mp3'),
    isAudioOnly: Joi.boolean().default(false),
    isNoTTWatermark: Joi.boolean().default(false),
    dubLang: Joi.boolean().default(false),
    vCodec: Joi.string().allow('h264', 'av1', 'vp9').default('h264'),
    filenamePattern: Joi.string().allow('basic', 'pretty', 'nerdy').default('basic'),
    twitterGif: Joi.boolean().default(false),
    instagramNoCrop: Joi.boolean().default(false),
});
