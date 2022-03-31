import { CommandInteraction, MessageActionRow } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import FlexGangEmbed from "../../components/embed/FlexGangEmbed";

const LANES = [
    ':crossed_swords: top',':herb: jungle',':mage: mid',':bow_and_arrow: adc',':hospital: support'
]

@Discord()
abstract class Flexgang {
  @Slash("flexgang", {description: "Assigne une lane aléatoire à chacun des membres de ton vocal"})
  public flexgang(@SlashOption("joueurs", { description: "Noms des joueurs séparés par des espaces", required: false}) playersAsString: string, interaction: CommandInteraction): void {
    if (!!playersAsString) {
        const players = playersAsString.split(' '); 
        const lanes: string[] = JSON.parse(JSON.stringify(LANES));
        const roleDistribution = new Map<string,string>([]);
        let playerIndex = 0;
        for(let i = lanes.length-1;i>=0;i--){
            roleDistribution.set(lanes.splice(Math.floor(Math.random()*lanes.length), 1)[0], players[playerIndex]);
            playerIndex++;
        } 
        interaction.reply({embeds: [new FlexGangEmbed(LANES, roleDistribution)]});
    } else {
        interaction.reply('????');        
    }
  }
}

export default Flexgang;
