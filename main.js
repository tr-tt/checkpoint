import "./style.css"

const html__input_video = document.querySelector("#html__input_video")
const html__video = document.querySelector("#html__video")
const html__button_prev = document.querySelector("#html__button_prev")
const html__button_next = document.querySelector("#html__button_next")
const html__button_show = document.querySelector("#html__button_show")
const html__button_add = document.querySelector("#html__button_add")
const html__button_delete = document.querySelector("#html__button_delete")
const var__checkpoints = []

const playSelectedFile = () =>
{
    const file = html__input_video.files[0] || ""
    const type = file.type

    if("video/mp4" === type)
    {
        const fileURL = URL.createObjectURL(file)

        html__video.src = fileURL
    }
    else
    {
        html__video.src = ""
    }
}

const addCheckpoint = () =>
{
    var__checkpoints.push(html__video.currentTime)
}

const deleteCheckpoint = () =>
{
    var__checkpoints.pop()
}

const showCheckpoints = () =>
{
    console.log(var__checkpoints);
}

const movePrev = () =>
{
    const var__checkpointPrev = var__checkpoints
        .reduce(
            (accumulator, currentValue) =>
            {
                return currentValue < html__video.currentTime
                    ?
                        Math.abs(currentValue - html__video.currentTime) < Math.abs(accumulator - html__video.currentTime)
                        ? 
                            currentValue
                        :
                            accumulator
                    :
                        accumulator
            },
            0
        )

    html__video.currentTime = var__checkpointPrev
}

const moveNext = () =>
{
    const var__checkpointNext = var__checkpoints
        .reduce(
            (accumulator, currentValue) =>
            {
                return currentValue > html__video.currentTime
                    ?
                        Math.abs(currentValue - html__video.currentTime) < Math.abs(accumulator - html__video.currentTime)
                        ? 
                            currentValue
                        :
                            accumulator

                    :
                        accumulator
            },
            html__video.duration
        )

    html__video.currentTime = var__checkpointNext
}

const keyboardHandle = (event) =>
{
    switch(event.key)
    {
        case "ArrowUp":
            movePrev()
            break
        case "ArrowDown":
            moveNext()
            break
        default:
    }
}

html__input_video.addEventListener("change", playSelectedFile, false)
html__button_add.addEventListener("click", addCheckpoint, false)
html__button_delete.addEventListener("click", deleteCheckpoint, false)
html__button_show.addEventListener("click", showCheckpoints, false)
html__button_prev.addEventListener("click", movePrev, false)
html__button_next.addEventListener("click", moveNext, false)

document.addEventListener('keydown', keyboardHandle, false)