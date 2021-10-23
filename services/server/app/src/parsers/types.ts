interface Recipe {
    title: string;
    description?: string;
    websiteName: string;
    image: string;
    ingredients: string[];
    steps: string | string[];
    nutrition?: {
        calories?: number;
    };
    cookTime?: number;
    prepTime?: number;
    servings?: string;
}

export type {
    Recipe,
};
