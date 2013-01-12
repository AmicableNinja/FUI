FUI.drivers = {
	browser : {},
	keyboard: {}
};

/*

"Drivers" are currently a way to just get this working

still undecided whether to use browser specific drivers or just use a general-purpose cross-browser approximation that makes concessions
probably use a driver system with the default to the latter, allowing specific adaptations when greater control is desired - say for a Wacom Bamboo (differentiate between the mouse)

as such, the API is:

um...see the firefox file...for now
(I'm being bad, standardize first, then implement :'( )

*/