import React, { useEffect, useState } from "react";
import {
    Ionicons,
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    Fontisto,
    Foundation,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
} from "@expo/vector-icons";

const Icon = ({ family, iconName, ...props }) => {
    let Family;

    switch (family) {
        case "AntDesign":
            Family = AntDesign;
            break;
        case "Entypo":
            Family = Entypo;
            break;
        case "EvilIcons":
            Family = EvilIcons;
            break;
        case "Feather":
            Family = Feather;
            break;
        case "FontAwesome":
            Family = FontAwesome;
            break;
        case "FontAwesome5":
            Family = FontAwesome5;
            break;
        case "Fontisto":
            Family = Fontisto;
            break;
        case "Foundation":
            Family = Foundation;
            break;
        case "Ionicons":
            Family = Ionicons;
            break;
        case "MaterialCommunityIcons":
            Family = MaterialCommunityIcons;
            break;
        case "MaterialIcons":
            Family = MaterialIcons;
            break;
        case "Octicons":
            Family = Octicons;
            break;
        case "SimpleLineIcons":
            Family = SimpleLineIcons;
            break;
        case "Zocial":
            Family = Zocial;
            break;
        default:
            Family = Ionicons;
    }

    return (
        <Family
            name={iconName ? iconName : "help-outline"}
            color={"#000"}
            size={20}
            {...props}
        />
    );
};

export default Icon;

