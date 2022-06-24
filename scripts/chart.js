class Bar {
    constructor({backgroundColor = "white", borderRadius = 7, height = 0, heightPercentage = false, id = 0, order, value}) {
        this.div = document.createElement("div")
        this.div.id = id
        this.div.style.order = order
        this.div.style.flexGrow = 1
        this.div.style.position = "relative"
        this.div.style.boxSizing = "border-box"
        this.div.style.display = "inline-block"
        this.div.style.border = "1px solid black"
        this.div.style.backgroundColor = backgroundColor
        this.div.style.borderTopLeftRadius = borderRadius + "px"
        this.div.style.borderTopRightRadius = borderRadius + "px"
        this.div.style.height = heightPercentage ? height + "%" : height + "px"
        this.div.addEventListener("click", async function () {
            setStatusButtonsSlides(true)
            await binarySearch(chart.array, parseInt(value))
            setStatusButtonsSlides(false)
        })
    }
}

class Chart {
    constructor({alignItems = "center", backgroundColor = "black", colorBarSelect = "#ff0000", colorBarDefault = "#48BF84", iterationDelay = 30, maxValue = 100}) {
        this.array
        this.maxValue = maxValue
        this.isSorted = false
        this.iterationDelay = iterationDelay
        this.div = document.createElement("div")
        this.div.style.order = 1
        this.div.className = "chart"
        this.div.style.width = "100%"
        this.div.style.height = "100%"
        this.div.style.display = "flex"
        this.coverageInterval = true
        this.div.style.position = "relative"
        this.div.style.justifyContent = "center"
        this.div.style.alignItems = alignItems
        this.colorBarSelect = colorBarSelect
        this.colorBarDefault = colorBarDefault
        this.div.style.backgroundColor = backgroundColor
    }
    
    setup(div) {
        div.appendChild(this.div)
    }

    setBar(bar) {
        this.div.appendChild(bar.div)
    }

    clearBars() {
        Array.from(this.div.children).forEach(element => {
            element.remove()
        });
    }

    shuffleArray() {
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = temp;
        }
    }

    fillArrayCoverageInterval(count) {
        this.array = new Array(parseInt(count))
        for (let i = 0; i < count; i++) this.array[i] = i
        this.shuffleArray()
    }

    fillArrayRandom(count, maxNumber) {
        this.array = new Array(parseInt(count))
        for (let i = 0; i < count; i++) this.array[i] = getRandomInt(maxNumber)
    }

    fill(count, maxNumber) {
        let bar
        this.isSorted = false
        this.clearBars()
        if (this.coverageInterval) this.fillArrayCoverageInterval(count)
        else this.fillArrayRandom(parseInt(count), maxNumber)
        this.maxValue = maxNumber
        for (let i = 0; i < this.array.length; i++) {
            bar = new Bar({backgroundColor: "rgb(72, 191, 132)", 
             height: (this.array[i] / (this.coverageInterval ? count : maxNumber) * 100),
             heightPercentage: true, order: i, id: i, value: this.array[i]})
            this.setBar(bar)
        }
    }

    swap(id1, id2) {
        let firstElement = document.getElementById(id1)
        let secondElement = document.getElementById(id2)
    
        // using the order property, we will change the order of the number blocks
        let tempOrder = firstElement.style.order
        firstElement.style.order = secondElement.style.order
        secondElement.style.order = tempOrder
    
        // you also need to change the ids of the blocks, because the numbers have also changed their ids
        let tempId = firstElement.id
        firstElement.id = secondElement.id
        secondElement.id = tempId
    }

    async paintBar(id, color) { document.getElementById(id).style.backgroundColor = color }

    async paintBarRange(id1, id2, color) {
        for (let i = id1; i < id2; i++) {
            await this.paintBar(i, color)
            await delay(this.iterationDelay)
        }
    }

    async finalize() {
        for (let i = 0; i < this.array.length; i++) {
            await this.paintBar(i, this.colorBarSelect)
            await delay(this.iterationDelay/i)
        }
        for (let i = 0; i < this.array.length; i++) {
            await this.paintBar(i, this.colorBarDefault)
            await delay(this.iterationDelay/i)
        }
    }

    async changeBarHeight(id, height) {
        let element = document.getElementById(id)
        element.style.height = height + "%"
    }

    async quickSort() {
        await quickSort(this.array, 0, chart.array.length - 1)
        await this.finalize()
        this.isSorted = true
    }

    async insertionSort() {
        await insertionSort(this.array)
        await this.finalize()
        this.isSorted = true
    }

    async cocktailSort() {
        await cocktailSort(this.array)
        await this.finalize()
        this.isSorted = true
    }

    async countingSort() {
        this.array = await countingSort(this.array, this.coverageInterval ? this.array.length : this.maxValue)
        await this.finalize()
        this.isSorted = true
    }
}
