import ColorHash from 'color-hash';

export const COLOR_HASH = new ColorHash({
  lightness: 0.85,
  saturation: 1
})

export const COLOR_HASH_DARK = new ColorHash({
  lightness: 0.25,
  saturation: 1
})

enum ColorHashStyle {
	LIGHT = 0,
	DARK = 1
}

type GenerateColorPayload = {
	str: string,
	style?: ColorHashStyle
}

export const generateColor = ({
	str,
	style = ColorHashStyle.LIGHT
}: GenerateColorPayload): string => {
	if (style === ColorHashStyle.LIGHT) {
		return COLOR_HASH.hex(str)
	}
	return COLOR_HASH_DARK.hex(str)
}