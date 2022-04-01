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
    let players: string[] = [];
    if (!!playersAsString) {
        players.push(...playersAsString.split(' ')); 
    }
    const voiceChannel = interaction.guild?.members.cache.get(interaction.user.id)?.voice;
    voiceChannel?.channel?.members.forEach((member) => {
      players.push(member.user.username);
    })

    if (!players.length) {
      interaction.reply("Rejoins un vocal ou définit des joueurs avant d'utiliser cette commande");
    } else {
      const lanes: string[] = JSON.parse(JSON.stringify(LANES));
      const roleDistribution = new Map<string,string>([]);
      let playerIndex = 0;
      for(let i = lanes.length-1;i>=0;i--){
          roleDistribution.set(lanes.splice(Math.floor(Math.random()*lanes.length), 1)[0], players[playerIndex]);
          playerIndex++;
      } 
      interaction.reply({embeds: [new FlexGangEmbed(LANES, roleDistribution)]});  
    }
  }
}

export default Flexgang;
