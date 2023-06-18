import { ActionIcon, Container, createStyles, Group, rem, Text } from "@mantine/core";
import { TbBrandGithub, TbBrandTwitter } from "react-icons/tb";

const useStyles = createStyles(theme => ({
  footer: {
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column"
    }
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md
    }
  }
}));

export const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text color="gray" weight="bold">
          @kwameopareasiedu
        </Text>

        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg" component="a" href="https://twitter.com/KOpareAsiedu" target="_blank">
            <TbBrandTwitter size="1.05rem" />
          </ActionIcon>

          <ActionIcon size="lg" component="a" href="https://github.com/kwameopareasiedu" target="_blank">
            <TbBrandGithub size="1.05rem" />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};
