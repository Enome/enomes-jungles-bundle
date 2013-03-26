IP = x.x.x.x

dump_local:
	@vagrant ssh -c 'pg_dump jungles' > vagrant/dump.sql

dump_online:
	@ssh root@$(IP) 'sudo -u postgres pg_dump jungles' > vagrant/dump.sql

download_media:
	@scp -r root@$(IP):/var/www/jungles/current/media/ ./

setup_server:
	@ssh root@$(IP) 'apt-get install puppet && puppet module install --force akumria/postgresql && curl https://raw.github.com/Enome/puppet/master/jungles.pp | puppet apply'
