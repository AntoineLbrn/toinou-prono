import { AutocompleteInteraction } from "discord.js";
import getSubscriptionsByServerId from "../api/subscriptions/getSubscriptionsByServerId";
import ServerTournamentSubscribtion from "../models/ServerTournamentSubscription";
import getParticipationsByUserId from "../api/participations/getParticipationsByUserId";
import { UserTournamentParticipation } from "../models/UserTournamentParticipation";

interface AutocompleteOption {
    value: string,
    name: string
}

export const autocompleteTournaments = async (interaction: AutocompleteInteraction): Promise<void>  => {
    const options = interaction.guildId ? await getGuildTournaments(interaction.guildId) : await getUserTournaments(interaction.user.id);
    return interaction.respond(options).catch((err) => console.log(err));
}

const getGuildTournaments = async (guildId: string): Promise<AutocompleteOption[]> => {
    return getSubscriptionsByServerId(guildId).then((subscriptions: ServerTournamentSubscribtion[]) => {
        return subscriptions.map((subscription: ServerTournamentSubscribtion) => {
            return {name: subscription.tournament.label, value: subscription.tournament.label}
        })
    }).catch((err) => {
        return [];
    });
}

const getUserTournaments = async (userId: string): Promise<AutocompleteOption[]> => {
    return getParticipationsByUserId(userId, ['tournament']).then((participations: UserTournamentParticipation[]) => {
        return participations.map((participation: UserTournamentParticipation) => {
            return {name: participation.tournament.label, value: participation.tournament.label}
        })
    }).catch((err) => {
        return [];
    });
}