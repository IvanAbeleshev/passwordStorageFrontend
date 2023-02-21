class PasswordGenerator{
  private lowCaseSymbols = 'abcdefghijklmnopqrstuvwxyz'
  private upperCaseSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private integerSymbols = '0123456789'
  private extraSymbols = `!@#$%^&*_-=+`

  public passwordLength = 8
  public useUpperCaseSymbols = false
  public useExtraSymbols = false

  constructor(passwordLength:number, useUpperCaseSymbols:boolean, useExtraSymbols:boolean){
    this.passwordLength = passwordLength
    this.useUpperCaseSymbols = useUpperCaseSymbols
    this.useExtraSymbols = useExtraSymbols
  }

  private randomIntFromInterval=(min:number, max:number)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  public generatePassword=():string=>{
    let resultPassword:string =''
    let countPasswordGroup = 1
    
    if(this.useUpperCaseSymbols)
      countPasswordGroup++
    
    if(this.useExtraSymbols)
      countPasswordGroup++

    for(let indexPassword=0; indexPassword<this.passwordLength; indexPassword++){
      const chapterIndex = this.randomIntFromInterval(0, countPasswordGroup)
      switch(chapterIndex){
        case 0:{
          const randomSymbol = this.randomIntFromInterval(0, this.lowCaseSymbols.length-1)
          resultPassword += this.lowCaseSymbols[randomSymbol]
          break
        }
        case 1:{
          const randomSymbol = this.randomIntFromInterval(0, this.upperCaseSymbols.length-1)
          resultPassword += this.upperCaseSymbols[randomSymbol]
          break
        }
        case 2:{
          const randomSymbol = this.randomIntFromInterval(0, this.integerSymbols.length-1)
          resultPassword += this.integerSymbols[randomSymbol]
          break
        }
        case 3:{
          const randomSymbol = this.randomIntFromInterval(0, this.extraSymbols.length-1)
          resultPassword += this.extraSymbols[randomSymbol]
          break
        }
      }
    }
    return resultPassword
  }
}

export default PasswordGenerator