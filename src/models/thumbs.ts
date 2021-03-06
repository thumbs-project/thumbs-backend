import { extractLabelFunc } from "../utils/policy";

export interface ThumbResult {
    thumb_id: number,
    user_id: number,
    name: string,
    satiety: number,
    affection: number,
    hygiene: number,
    health: number,
    disease: string,
    image: string
}

/**
 * @apiDefine Thumb
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "thumbId": 1,
 *     "name": "귀요미",
 *     "image": "https://s3.ap-northeast-2.amazonaws.com/rohi-thumbs/image-xxhdpi/gloomy.png",
 *     "disease": "rash"
 *     "condition": {
 *         "affection": {
 *             "label": "normal",
 *             "value": 30
 *         },
 *         "health": {
 *             "label": "low",
 *             "value": 0
 *         },
 *         "hygiene": {
 *             "label": "normal",
 *             "value": 70
 *         },
 *         "satiety": {
 *             "label": "low",
 *             "value": 0
 *         }
 *     }
 * }
 */
/**
 * @apiDefine ThumbList
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * [
 *     {
 *         "thumbId": 1,
 *         "name": "귀요미",
 *         "image": "https://s3.ap-northeast-2.amazonaws.com/rohi-thumbs/image-xxhdpi/normal.png",
 *         "disease": "rash"
 *         "condition": {
 *             "affection": {
 *                 "label": "normal",
 *                 "value": 30
 *             },
 *             "health": {
 *                 "label": "low",
 *                 "value": 0
 *             },
 *             "hygiene": {
 *                 "label": "high",
 *                 "value": 70
 *             },
 *             "satiety": {
 *                 "label": "low",
 *                 "value": 0
 *             }
 *         }
 *     }
 * ]
 */
export interface Thumb {
    thumbId: number,
    image: string,
    disease: string,
    condition: ThumbConditionList
}

export interface ThumbConditionList {
    affection: ThumbCondition,
    health: ThumbCondition,
    hygiene: ThumbCondition,
    satiety: ThumbCondition,
}

export interface ThumbCondition {
    label: string,
    value: number;
}

export const convertToThumb = async function (result: ThumbResult) {
    const valueToLabel = await extractLabelFunc();

    return {
        thumbId: result["thumb_id"],
        name: result["name"],
        image: result["image"],
        disease: result["disease"],
        condition: {
            affection: {
                label: valueToLabel("affection", result["affection"]),
                value: result["affection"]
            },
            health: {
                label: valueToLabel("health", result["health"]),
                value: result["health"]
            },
            hygiene: {
                label: valueToLabel("hygiene", result["hygiene"]),
                value: result["hygiene"]
            },
            satiety: {
                label: valueToLabel("satiety", result["satiety"]),
                value: result["satiety"]
            }
        }
    };
};
